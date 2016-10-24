import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)
import Http
import Task
import Json.Decode as Json


main : Program Never
main =
  App.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- MODEL

type alias Person =
  { firstname : String
  , lastname : String
  , email : String
  , phone : String
  , manager : String
  , photo : String
  }

type alias Persons = List Person

-- UPDATE

type Msg = FetchSucceed Persons | FetchFailed Http.Error

update : Msg -> Persons -> (Persons, Cmd Msg)
update msg persons =
  case msg of
    FetchSucceed newPersons ->
      (newPersons, Cmd.none)

    FetchFailed _ ->
      (persons, Cmd.none)


fetchPersons : Cmd Msg
fetchPersons =
  let
    url = "http://localhost:3001/api/peoples"
  in
    Task.perform FetchFailed FetchSucceed (Http.get decodePeoplesUrl url)

decodePeoplesUrl : Json.Decoder Persons
decodePeoplesUrl =
  Json.list
    (Json.object6 Person
      (Json.at ["firstname"] Json.string)
      (Json.at ["lastname"] Json.string)
      (Json.at ["email"] Json.string)
      (Json.at ["phone"] Json.string)
      (Json.at ["manager"] Json.string)
      (Json.at ["photo"] Json.string)
    )


-- VIEW

view : Persons -> Html Msg
view persons =
  div []
    [ nav []
      [ div [ class "nav-wrapper" ]
        [ a [] [ img [ class "logo", src "images/logo-people.svg" ] [] ]
        , ul
          [ id "nav-mobile"
          , class "right hide-on-med-and-down" ]
          [ li [] [ a [] [ text "Peoples" ] ] ]
        ]
      ]
    , div [ class "container" ]
      [ div [ class "header row" ]
        [ span [ class "col s6" ] [ text "You have 2 contacts" ] ]
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
    ]

renderPerson : Person -> Html a
renderPerson person = div [ class "col s6" ]
  [ div [ class "card-panel" ]
    [ div [ class "row" ]
      [ div [ class "col s7" ]
        [ div [ class "people-header layout vertical flex" ]
          [ a [ class "username", href "detail.html" ]
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
        , a [ href "list.html" ]
          [ i [ class "icon material-icons" ] [ text "delete" ] ]
        ]
      ]
    ]
  ]


-- SUBSCRIPTIONS

subscriptions : Persons -> Sub Msg
subscriptions persons =
  Sub.none


-- INIT

init : (Persons, Cmd Msg)
init =
  ([], fetchPersons)
