package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/stephen/models"
	"github.com/stephen/routes"
	"github.com/stephen/storage"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Version 0.0.1")
	})
	api := app.Group("/api")
	// api.Post("/create", controllers.Create)
	// api.Get("/getall", controllers.GetAll)
	routes.UserRoutes(api)
	routes.HierarchyRoutes(api)
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
    config := &storage.Config{
        Host:     os.Getenv("DB_HOST"),
        Port:     os.Getenv("DB_PORT"),
        Password: os.Getenv("DB_PASSWORD"),
        User:     os.Getenv("DB_USER"),
        DBName:   os.Getenv("DB_NAME"),
        SSLMode:  os.Getenv("DB_SSLMODE"),
    }
	db, err := storage.ConnectDB(config)
	if err != nil {
		strErr:= fmt.Sprintf("DB connection failed: %v", err)
		log.Fatal(strErr)
	}
    err = models.MigrateUsers(db)
    if err != nil {
        log.Fatal("DB migration failed")
    }
	models.MigrateHierarchy(db)
	app := fiber.New()
	SetupRoutes(app)
	err = app.Listen("127.0.0.1:6969")
	if err != nil {
		strErr:= fmt.Sprintf("Server Error: %v", err)
		log.Fatal(strErr)
	}
	

}
