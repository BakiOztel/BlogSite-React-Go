package middleware

import (
	"fmt"
	"os"
	"time"

	"github.com/BakiOztel/Blog-Backend/config"
	"github.com/BakiOztel/Blog-Backend/entities"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func Jwtmiddleware(c *fiber.Ctx) error {
	tokenString := c.Cookies("Authorization")
	var user entities.User
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "fail", "message": "You are not logged in"})
	}
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET")), nil
	})
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.Status(fiber.StatusUnauthorized)
		}

		config.Database.First(&user, claims["sub"])

		if user.ID == 0 {
			c.Status(fiber.StatusUnauthorized)
		}

	} else {
		c.Status(fiber.StatusUnauthorized)
	}
	c.Locals("user", user.ID)
	return c.Next()
}
