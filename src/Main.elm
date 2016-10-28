import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Json
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

hashParser : Navigation.Location -> Result String Page
hashParser location =
  UrlParser.parse identity pageParser (String.dropLeft 1 location.hash)

pageParser : Parser (Page -> a) a
pageParser =
  oneOf
    [ format Home (UrlParser.s "")
    , format Details (UrlParser.s "details" </> string)
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
  }

type alias Persons = List Person

type Page = Home | Details String

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
    (Json.object7 Person
      (Json.at ["id"] Json.string)
      (Json.at ["firstname"] Json.string)
      (Json.at ["lastname"] Json.string)
      (Json.at ["email"] Json.string)
      (Json.at ["phone"] Json.string)
      (Json.at ["manager"] Json.string)
      (Json.at ["photo"] Json.string)
    )


-- VIEW

-- TODO: handle navigation through links
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
          [ h3 [] [ text "Skills" ]
          -- TODO: loop through items
          , a [ class "btn-large" ] [ text "JS" ]
          ]
        , div [ class "links row" ]
          [ a [ href "#" ] [ img [ src "images/md-twitter.svg" ] [] ]
          , a [ href "#" ] [ img [ src "images/md-slack.svg" ] [] ]
          , a [ href "#" ] [ img [ src "images/md-github.svg" ] [] ]
          , a [ href "#" ] [ img [ src "images/md-linkedin.svg" ] [] ]
          ]
      ]
    ]

renderPersonCard : Person -> Html Msg
renderPersonCard person =
  div [ class "row" ]
    [ div [ class "col s7" ]
      [ div [ class "people-header layout vertical flex" ]
        [ a [ class "username", onClick (NavigateTo (Details person.id)) ]
          [ span [] [ text person.firstname ]
          , text " "
          , span [ class "lastname" ] [ text person.lastname ]
          ]
        ]
      , div [ class "people-data" ]
        [ div []
          [ img [ src "images/md-email.svg" ] []
          , span [] [ text person.email ]
          ]
        , div []
          [ img [ src "images/md-phone.svg" ] []
          , span [] [ text person.phone ]
          ]
        , div []
          [ div []
            [ span [ class "label" ] [ text "Manager: " ]
            , span [] [ text person.manager ]
            ]
          ]
        ]
      ]
    , div [ class "col s5" ]
      [ img [ class "picture", src person.photo ] []
      , img [ class "icon", src "images/md-map.svg" ] []
      , a [ href "edit.html" ]
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
