package middlewares

import (
	"os"
	"github.com/gofiber/fiber/v2"
	jwt "github.com/gofiber/jwt/v4"
)

func Auth() fiber.Handler {
	secret := os.Getenv("JWT_SECRET")
	return jwt.New(jwt.Config{
		SigningKey: jwt.SigningKey{
			Key: []byte(secret),
		},
	})
}
