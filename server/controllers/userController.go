package controllers

import (
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/stephen/models"
	"github.com/stephen/storage"
)

func Create(c *fiber.Ctx) error {
	// return c.SendString("Create")
	user := models.User{}

	err := c.BodyParser(&user)
	if err != nil {
		log.Fatal("Error parsing body")
		c.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}
	err = storage.DB.Db.Create(&user).Error
	if err != nil {
		c.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "user not created"})
		return err
	}
	c.Status(http.StatusCreated).JSON(
		&fiber.Map{"message": "user created successfully"})
	return nil
}

func GetAll(c *fiber.Ctx) error {
	userModels := &[]models.User{}
	err := storage.DB.Db.Find(userModels).Error
	if err != nil {
		c.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "user not found"})
		return err
	}
	c.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "users found",
		"data":    userModels,
	})
	return nil
}
