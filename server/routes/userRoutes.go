package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/stephen/controllers"
)

func UserRoutes(app fiber.Router) {
	api := app.Group("/users")
	api.Post("/create", controllers.Create)
	api.Get("/getall", controllers.GetAll)

}
