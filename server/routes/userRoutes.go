package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/stephen/controllers"
	"github.com/stephen/middlewares"
)

func UserRoutes(app fiber.Router) {
	api := app.Group("/users")
	auth := middlewares.Auth()
	api.Post("/create", controllers.Create)
	api.Get("/getall", auth, controllers.GetAll)
	api.Post("/login", controllers.Login)
}
