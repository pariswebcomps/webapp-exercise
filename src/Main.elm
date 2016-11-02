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
  nav []
    [ div [ class "nav-wrapper" ]
      [ a [] [ img [ class "logo", src "images/logo-people.svg" ] [] ]
      , ul
        [ id "nav-mobile"
        , class "right hide-on-med-and-down" ]
        [ li [] [ a [] [ text "Peoples" ] ] ]
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
