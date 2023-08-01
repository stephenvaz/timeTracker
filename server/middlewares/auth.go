package middlewares

// import (
// 	"github.com/gofiber/fiber/v2"
// 	jwtware "github.com/golang-jwt/jwt/v5"
// )

// // Middleware JWT function
// func NewAuthMiddleware(secret string) fiber.Handler {
// 	jwtMiddleware := jwtware.New(jwtware.Config{
// 		SigningKey: []byte(secret),
// 	})

// 	return func(c *fiber.Ctx) error {
// 		// Execute the JWT middleware here
// 		err := jwtMiddleware.CheckJWT(c)
// 		if err != nil {
// 			// Handle the error or unauthorized request
// 			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
// 				"error": "Unauthorized",
// 			})
// 		}
// 		// Proceed to the next middleware or route handler
// 		return c.Next()
// 	}
// }
