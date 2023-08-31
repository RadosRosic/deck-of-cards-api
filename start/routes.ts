import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post("new-deck", "")

  Route.post("new-pile", "")

  Route.post("draw", "")

  Route.post("shuffle", "")

  Route.post("view", "")
}).prefix("api")