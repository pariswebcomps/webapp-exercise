import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Json
import Json.Decode.Pipeline as JsonPipeline
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
    , subscriptions = subscriptions
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
  { id: String
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

type alias Persons = List Person

type Page = Home | Details String | Edit String

type alias Model = { page: Page, persons: Persons }


-- UPDATE

type Msg = FetchSucceed Persons
         | FetchFailed Http.Error
         | NavigateTo Page

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    FetchSucceed newPersons ->
      ({ model | persons = newPersons }, Cmd.none)

    FetchFailed _ ->
      (model, Cmd.none)

    NavigateTo page ->
      (model, Navigation.newUrl (toHash page))

urlUpdate : Result String Page -> Model -> (Model, Cmd Msg)
urlUpdate result model =
  case result of
    Ok newPage ->
      ({ model | page = newPage }, fetchPersons)

    Err _ ->
      (model, Cmd.none)

fetchPersons : Cmd Msg
fetchPersons =
  let
    url = "http://localhost:3001/api/peoples"
  in
    Task.perform FetchFailed FetchSucceed (Http.get decodePeoplesUrl url)

decodePeoplesUrl : Json.Decoder Persons
decodePeoplesUrl =
  Json.list
    (JsonPipeline.decode Person
      |> JsonPipeline.required "id" Json.string
      |> JsonPipeline.required "firstname" Json.string
      |> JsonPipeline.required "lastname" Json.string
      |> JsonPipeline.required "email" Json.string
      |> JsonPipeline.required "phone" Json.string
      |> JsonPipeline.required "manager" Json.string
      |> JsonPipeline.required "photo" Json.string
      |> JsonPipeline.required "skills" (Json.list Json.string)
      |> JsonPipeline.required "links" decodeLinks
    )

decodeLinks : Json.Decoder Links
decodeLinks =
  JsonPipeline.decode Links
    |> JsonPipeline.required "twitter" Json.string
    |> JsonPipeline.required "slack" Json.string
    |> JsonPipeline.required "github" Json.string
    |> JsonPipeline.required "linkedin" Json.string

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
          , class "right hide-on-med-and-down" ]
          [ li [] [ a [ onClick (NavigateTo Home) ] [ text "Peoples" ] ] ]
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
            , label [ class "active", for "search" ] [ text "Search" ]
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
        [ div [ class "row" ] [ renderDetailedPerson person ] ]

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
              [ span [ class "card-title" ] [ text "Contact information" ]
              , renderInput "first_name" "Firstname" person.firstname
              , renderInput "last_name" "Lastname" person.lastname
              , renderInput "email" "Email" person.email
              , renderInput "phone" "Phone number" person.phone
              ]
            , div [ class "card-action" ]
              -- TODO: handle Cancel
              [ a [ class "cancel btn waves-effect waves-light deep-orange m-right", href "#" ]
                [ text "Cancel" ]
              -- TODO: handle Submit
              , a [ class "btn waves-effect waves-light", href "#" ] [ text "Submit" ]
              ]
            ]
          ]
        ]

    Nothing ->
      div [ class "container" ] [ text "There is nobody to edit mate!" ]

renderInput : String -> String -> String -> Html a
renderInput idText labelText valueText =
  div [ class "row" ] [
    div [ class "input-field col s12" ]
      [ input [ id idText, class "validate", value valueText, required True ] []
      , label [ for idText, class "active" ] [ text labelText ]
      ]
  ]

renderNumberOfContacts : Int -> Html a
renderNumberOfContacts number =
  let
    pluralized = if number > 1 then "s" else ""
  in
    span [ class "col s6" ]
      [ text ("You have " ++ toString number ++ " contact" ++ pluralized) ]

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
          :: List.map (\skill -> a [ class "btn-large" ] [ text skill ]) person.skills)
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
    [ img [ class "pad-horizontal", src ("images/md-" ++ imageType ++ ".svg") ] [] ]

renderPersonCard : Person -> Html Msg
renderPersonCard person =
  div [ class "row" ]
    [ div [ class "col s7" ]
      [ div [ class "layout vertical flex" ]
        [ a [ class "username", onClick (NavigateTo (Details person.id)) ]
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


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- INIT

init : Result String Page -> (Model, Cmd Msg)
init result =
  urlUpdate result (Model Home [])
