package handlers

import (
	"os"
	"time"

	middleware "github.com/BakiOztel/Blog-Backend/Middleware"
	"github.com/BakiOztel/Blog-Backend/config"
	"github.com/BakiOztel/Blog-Backend/entities"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func GetAllUser(c *fiber.Ctx) error {
	var users []entities.User

	config.Database.Find(&users)
	return c.Status(201).JSON(fiber.Map{
		"users": users,
	})
}

func CreateUser(c *fiber.Ctx) error {
	user := new(entities.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(503).SendString(err.Error())
	}
	hashPassword, _ := middleware.HashPassword(user.Password)
	user.Password = hashPassword
	config.Database.Create(&user)
	return c.Status(201).JSON(user)
}

func LoginUser(c *fiber.Ctx) error {
	userr := new(entities.UserRequest)
	user := new(entities.User)
	userRespon := new(entities.UserResponse)

	if err := c.BodyParser(userr); err != nil {
		return c.Status(503).SendString(err.Error())
	}
	config.Database.Find(&user, "Email =?", userr.Email)
	if user.ID == 0 {
		return c.Status(401).SendString("böyle bir hesap yok")

	}
	if middleware.CheckPasswordHash(userr.Password, user.Password) {

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub": user.ID,
			"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
		})
		tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
		if err != nil {
			return c.Status(401).SendString("Token oluştururken problem oluştu")
		}

		c.Cookie(&fiber.Cookie{
			Name:     "Authorization",
			Value:    tokenString,
			Expires:  time.Now().Add(24 * time.Hour),
			HTTPOnly: true,
			SameSite: "lax",
		})
		userRespon.ID = user.ID
		userRespon.Username = user.Username
		return c.Status(201).JSON(userRespon)

	} else {
		return c.Status(401).SendString("şifre yanlış")

	}
}

func StillLogin(c *fiber.Ctx) error {
	var user entities.User
	id := c.Locals("user")
	config.Database.Preload("Posts").Find(&user, "ID=?", id)
	userResponse := entities.UserResponse{
		ID:       user.ID,
		Username: user.Username,
	}
	return c.Status(fiber.StatusOK).JSON(userResponse)
}
