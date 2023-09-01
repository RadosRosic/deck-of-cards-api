import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post("new-deck", "NewDecksController.create")

  Route.post("new-pile", "")

  Route.post("draw", "DrawCardsController.draw")

  Route.post("shuffle", "ShuffleCardsController.shuffle")

  Route.post("view", "ViewCardsController.view")
}).prefix("api")