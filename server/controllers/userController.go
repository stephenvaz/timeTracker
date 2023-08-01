package controllers

import (
	"log"
	"net/http"
	"golang.org/x/crypto/bcrypt"

	"github.com/gofiber/fiber/v2"
	"github.com/stephen/models"
	"github.com/stephen/storage"
	"github.com/golang-jwt/jwt/v5"
	"time"

)

var jwtSecretKey = []byte("your-secret-key")

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func Create(c *fiber.Ctx) error {
	// return c.SendString("Create")
	user := models.User{}

	err := c.BodyParser(&user)
	// print(user.Password)
	hash, _ := HashPassword(user.Password)
	// print(hash)
	user.Password = hash
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

type login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func generateToken(user models.User) (string, error) {
	// Create the JWT token claims
	claims := jwt.MapClaims{
		"uid": user.UID,
		"email": user.Email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(), // Token expiration time (1 day)
	}

	// Create the JWT token with the claims and sign it using the secret key
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString(jwtSecretKey)
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

func Login(c *fiber.Ctx) error {
	loginReq := login{}
	err := c.BodyParser(&loginReq)
	if err != nil {
		c.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "invalid request"})
		return err
	}

	// Fetch the user with the provided email from the database
	user := models.User{}
	err = storage.DB.Db.Where("email = ?", loginReq.Email).First(&user).Error
	if err != nil {
		c.Status(http.StatusUnauthorized).JSON(
			&fiber.Map{"message": "invalid credentials"})
		return err
	}

	// Compare the provided password with the hashed password from the database
	if !CheckPasswordHash(loginReq.Password, user.Password) {
		c.Status(http.StatusUnauthorized).JSON(
			&fiber.Map{"message": "invalid credentials"})
		return nil
	}

	// Passwords match, authentication successful
	// Generate a JWT token
	hashData := models.User{}
	hashData.Email = user.Email
	hashData.UID = user.UID
	token, err := generateToken(hashData)
	if err != nil {
		c.Status(http.StatusInternalServerError).JSON(
			&fiber.Map{"message": "failed to generate token"})
		return err
	}

	// Return the token in the response
	c.Status(http.StatusOK).JSON(
		&fiber.Map{"message": "login successful", "token": token})
	return nil
}
