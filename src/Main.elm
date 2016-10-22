import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)


main : Program Never
main =
  App.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- MODEL

type alias Model = Int

type alias Person =
  { firstname : String
  , lastname : String
  , email : String
  , phone : String
  , manager : String
  , location : String
  , picture : String
  }

julie : Person
julie = Person "Julie" "Law" "lol@soc.com" "0156610094" "Erika" "Paris" "https://randomuser.me/portraits/women/49.jpg"

bob : Person
bob = Person "Bob" "Dylan" "bobo@soc.com" "0949494994" "Paul" "Paris" "https://randomuser.me/portraits/men/39.jpg"


-- UPDATE

type Msg = Nope

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Nope ->
      (0, Cmd.none)


-- VIEW

view : Model -> Html Msg
view model =
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
        [ div [ class "col s12" ]
          [ renderPerson julie
          , renderPerson bob
          ]
        ]
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
            , div []
              [ span [ class "label" ] [ text "Location: " ]
              , span [] [ text person.location ]
              ]
            ]
          ]
        ]
      , div [ class "col s5" ]
        [ img [ class "picture", src person.picture ] []
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

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none


-- INIT

init : (Model, Cmd Msg)
init =
  (0, Cmd.none)
