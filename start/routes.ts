import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post("new-deck", "NewDecksController.create")

  Route.post("new-pile", "")

  Route.post("draw", "")

  Route.post("shuffle", "")

  Route.post("view", "ViewCardsController.view")
}).prefix("api")