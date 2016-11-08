module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as JsonDecode
import Json.Decode.Pipeline as JsonPipeline
import Json.Encode as JsonEncode
import Navigation
import String exposing (..)
import Task
import UrlParser exposing (Parser, (</>), format, oneOf, s, string)


main : Program Never
main =
    Navigation.program (Navigation.makeParser hashParser)
        { init = init
        , view = view
        , update = update
        , urlUpdate = urlUpdate
        , subscriptions = \_ -> Sub.none
        }



-- URL PARSERS


toHash : Page -> String
toHash page =
    case page of
        Home ->
            "#"

        Details id ->
            "#details/" ++ id

        Edit id ->
            "#edit/" ++ id


hashParser : Navigation.Location -> Result String Page
hashParser location =
    UrlParser.parse identity pageParser (String.dropLeft 1 location.hash)


pageParser : Parser (Page -> a) a
pageParser =
    oneOf
        [ format Home (UrlParser.s "")
        , format Details (UrlParser.s "details" </> string)
        , format Edit (UrlParser.s "edit" </> string)
        ]



-- MODEL


type alias Person =
    { id : String
    , firstname : String
    , lastname : String
    , email : String
    , phone : String
    , manager : String
    , photo : String
    , skills : List String
    , links : Links
    }


type alias Links =
    { twitter : String
    , slack : String
    , github : String
    , linkedin : String
    }


type alias Persons =
    List Person


type Page
    = Home
    | Details String
    | Edit String


type alias Model =
    { page : Page, persons : Persons }



-- UPDATE


type Msg
    = FetchSucceed Persons
    | FetchFailed Http.Error
    | PutSucceed String Http.Response
    | PutFailed Http.RawError
    | NavigateTo Page
    | NavigateBack
    | EditField Update String String
    | EditPerson Person


type Update
    = FirstName
    | LastName
    | Email
    | Phone


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FetchSucceed newPersons ->
            ( { model | persons = newPersons }, Cmd.none )

        FetchFailed _ ->
            ( model, Cmd.none )

        PutSucceed id _ ->
            ( model, Navigation.newUrl <| toHash (Details id) )

        PutFailed _ ->
            ( model, Cmd.none )

        NavigateTo page ->
            ( model, Navigation.newUrl (toHash page) )

        NavigateBack ->
            ( model, Navigation.back 1 )

        EditField updateType id payload ->
            ( { model | persons = updateField updateType id payload model.persons }, Cmd.none )

        EditPerson person ->
            ( model, updatePerson person )


updateField : Update -> String -> String -> Persons -> Persons
updateField updateType id payload =
    case updateType of
        FirstName ->
            List.map
                (\person ->
                    if person.id == id then
                        { person | firstname = payload }
                    else
                        person
                )

        LastName ->
            List.map
                (\person ->
                    if person.id == id then
                        { person | lastname = payload }
                    else
                        person
                )

        Email ->
            List.map
                (\person ->
                    if person.id == id then
                        { person | email = payload }
                    else
                        person
                )

        Phone ->
            List.map
                (\person ->
                    if person.id == id then
                        { person | phone = payload }
                    else
                        person
                )


updatePerson : Person -> Cmd Msg
updatePerson person =
    let
        settings =
            Http.defaultSettings

        encodedSkills =
            JsonEncode.list (List.map JsonEncode.string person.skills)

        encodedLinks =
            JsonEncode.object
                [ ( "github", JsonEncode.string person.links.github )
                , ( "linkedin", JsonEncode.string person.links.linkedin )
                , ( "slack", JsonEncode.string person.links.slack )
                , ( "twitter", JsonEncode.string person.links.twitter )
                ]

        encodedPerson =
            JsonEncode.object
                [ ( "id", JsonEncode.string person.id )
                , ( "firstname", JsonEncode.string person.firstname )
                , ( "lastname", JsonEncode.string person.lastname )
                , ( "email", JsonEncode.string person.email )
                , ( "phone", JsonEncode.string person.phone )
                , ( "manager", JsonEncode.string person.manager )
                , ( "photo", JsonEncode.string person.photo )
                , ( "skills", encodedSkills )
                , ( "links", encodedLinks )
                ]

        request =
            { verb = "PUT"
            , headers = [ ( "Content-Type", "application/json" ) ]
            , url = "http://localhost:3001/api/peoples/" ++ person.id
            , body = Http.string (JsonEncode.encode 0 encodedPerson)
            }
    in
        Task.perform
            PutFailed
            (PutSucceed person.id)
            (Http.send settings request)


urlUpdate : Result String Page -> Model -> ( Model, Cmd Msg )
urlUpdate result model =
    case result of
        Ok newPage ->
            ( { model | page = newPage }, fetchPersons )

        Err _ ->
            ( model, Cmd.none )


fetchPersons : Cmd Msg
fetchPersons =
    let
        url =
            "http://localhost:3001/api/peoples"
    in
        Task.perform FetchFailed FetchSucceed (Http.get decodePeoplesUrl url)


decodePeoplesUrl : JsonDecode.Decoder Persons
decodePeoplesUrl =
    JsonDecode.list
        (JsonPipeline.decode Person
            |> JsonPipeline.required "id" JsonDecode.string
            |> JsonPipeline.required "firstname" JsonDecode.string
            |> JsonPipeline.required "lastname" JsonDecode.string
            |> JsonPipeline.required "email" JsonDecode.string
            |> JsonPipeline.required "phone" JsonDecode.string
            |> JsonPipeline.required "manager" JsonDecode.string
            |> JsonPipeline.required "photo" JsonDecode.string
            |> JsonPipeline.required "skills" (JsonDecode.list JsonDecode.string)
            |> JsonPipeline.required "links" decodeLinks
        )


decodeLinks : JsonDecode.Decoder Links
decodeLinks =
    JsonPipeline.decode Links
        |> JsonPipeline.required "twitter" JsonDecode.string
        |> JsonPipeline.required "slack" JsonDecode.string
        |> JsonPipeline.required "github" JsonDecode.string
        |> JsonPipeline.required "linkedin" JsonDecode.string



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ nav []
            [ div [ class "nav-wrapper" ]
                [ a [ onClick (NavigateTo Home) ]
                    [ img [ class "logo", src "images/logo-people.svg" ] [] ]
                , ul
                    [ id "nav-mobile"
                    , class "right hide-on-med-and-down"
                    ]
                    [ li []
                        [ a [ onClick (NavigateTo Home) ]
                            [ text "Peoples" ]
                        ]
                    ]
                ]
            ]
        , renderPage model
        ]


renderPage : Model -> Html Msg
renderPage model =
    case model.page of
        Home ->
            renderHome model.persons

        Details id ->
            model.persons
                |> getPersonWithId id
                |> renderDetails

        Edit id ->
            model.persons
                |> getPersonWithId id
                |> renderEdit


getPersonWithId : String -> Persons -> Maybe Person
getPersonWithId id persons =
    persons
        |> List.filter (\person -> person.id == id)
        |> List.head


renderHome : Persons -> Html Msg
renderHome persons =
    div [ class "container" ]
        [ div [ class "header row" ]
            [ renderNumberOfContacts (List.length persons) ]
        , div [ class "row" ]
            [ div [ class "col s12" ]
                [ Html.form [ class "col s12" ]
                    [ div [ class "input-field" ]
                        [ i [ class "material-icons prefix" ] [ text "search" ]
                        , input [ id "search" ] []
                        , label [ class "active", for "search" ]
                            [ text "Search" ]
                        ]
                    ]
                ]
            ]
        , div [ class "row" ]
            [ div [ class "col s12" ] (List.map renderPerson persons) ]
        ]


renderDetails : Maybe Person -> Html Msg
renderDetails maybe =
    case maybe of
        Just person ->
            div [ class "container" ]
                [ div [ class "row" ] [ renderDetailedPerson person ]
                , div [ class "fixed-action-btn horizontal edit-btn" ]
                    [ a
                        [ class "btn-floating btn-large red"
                        , onClick (NavigateTo (Edit person.id))
                        ]
                        [ i [ class "large material-icons" ]
                            [ text "mode_edit" ]
                        ]
                    ]
                ]

        Nothing ->
            div [ class "container" ] [ text "Nobody's here…" ]


renderEdit : Maybe Person -> Html Msg
renderEdit maybe =
    case maybe of
        Just person ->
            div [ class "container" ]
                [ div [ class "movieCardForm row" ]
                    [ Html.form [ class "form col s12 card z-depth-3" ]
                        [ div [ class "card-content" ]
                            [ span [ class "card-title" ]
                                [ text "Contact information" ]
                            , renderInput
                                "first_name"
                                "Firstname"
                                person.firstname
                                (EditField FirstName person.id)
                            , renderInput
                                "last_name"
                                "Lastname"
                                person.lastname
                                (EditField LastName person.id)
                            , renderInput
                                "email"
                                "Email"
                                person.email
                                (EditField Email person.id)
                            , renderInput
                                "phone"
                                "Phone number"
                                person.phone
                                (EditField Phone person.id)
                            ]
                        , div [ class "card-action" ]
                            [ a
                                [ class "cancel btn waves-effect waves-light deep-orange m-right"
                                , onClick NavigateBack
                                ]
                                [ text "Cancel" ]
                            , a
                                [ class "btn waves-effect waves-light"
                                , onClick (EditPerson person)
                                ]
                                [ text "Submit" ]
                            ]
                        ]
                    ]
                ]

        Nothing ->
            div [ class "container" ] [ text "There is nobody to edit mate!" ]


renderInput : String -> String -> String -> (String -> a) -> Html a
renderInput id' label' value' onInputMsg =
    div [ class "row" ]
        [ div [ class "input-field col s12" ]
            [ input
                [ id id', class "validate", value value', required True, onInput onInputMsg ]
                []
            , label [ for id', class "active" ] [ text label' ]
            ]
        ]


renderNumberOfContacts : Int -> Html a
renderNumberOfContacts number =
    let
        pluralized =
            if number > 1 then
                "s"
            else
                ""
    in
        span [ class "col s6" ]
            [ text
                ("You have " ++ toString number ++ " contact" ++ pluralized)
            ]


renderPerson : Person -> Html Msg
renderPerson person =
    div [ class "col s6" ]
        [ div [ class "card-panel" ] [ renderPersonCard person ] ]


renderDetailedPerson : Person -> Html Msg
renderDetailedPerson person =
    div [ class "col s6 offset-s3" ]
        [ div [ class "card-panel" ]
            [ renderPersonCard person
            , div [ class "skills" ]
                (h3 [] [ text "Skills" ]
                    :: List.map
                        (\skill -> a [ class "btn-large" ] [ text skill ])
                        person.skills
                )
            , div [ class "row center-align" ]
                [ renderPersonLink person.links.twitter "twitter"
                , renderPersonLink person.links.slack "slack"
                , renderPersonLink person.links.github "github"
                , renderPersonLink person.links.linkedin "linkedin"
                ]
            ]
        ]


renderPersonLink : String -> String -> Html Msg
renderPersonLink hrefText imageType =
    a [ href hrefText ]
        [ img
            [ class "pad-horizontal"
            , src ("images/md-" ++ imageType ++ ".svg")
            ]
            []
        ]


renderPersonCard : Person -> Html Msg
renderPersonCard person =
    div [ class "row" ]
        [ div [ class "col s7" ]
            [ div [ class "layout vertical flex" ]
                [ a
                    [ class "username"
                    , onClick (NavigateTo (Details person.id))
                    ]
                    [ span [] [ text person.firstname ]
                    , text " "
                    , span [ class "uppercase" ] [ text person.lastname ]
                    ]
                ]
            , div [ class "pad-top" ]
                [ div []
                    [ img [ src "images/md-email.svg" ] []
                    , span [] [ text person.email ]
                    ]
                , div []
                    [ img [ src "images/md-phone.svg" ] []
                    , span [] [ text person.phone ]
                    ]
                ]
            , div []
                [ span [ class "label" ] [ text "Manager: " ]
                , span [] [ text person.manager ]
                ]
            ]
        , div [ class "col s5" ]
            [ img [ class "picture", src person.photo ] []
            , img [ class "icon", src "images/md-map.svg" ] []
            , a [ onClick (NavigateTo (Edit person.id)) ]
                [ i [ class "icon material-icons" ] [ text "mode_edit" ] ]
            ]
        ]



-- INIT


init : Result String Page -> ( Model, Cmd Msg )
init result =
    urlUpdate result (Model Home [])
