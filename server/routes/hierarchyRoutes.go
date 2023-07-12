package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/stephen/controllers"
)

func HierarchyRoutes(app fiber.Router) {
	api := app.Group("/hierarchy")
	api.Get("/getall", controllers.GetHierarchy)

}
