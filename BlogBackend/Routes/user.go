package routes

import (
	middleware "github.com/BakiOztel/Blog-Backend/Middleware"
	"github.com/BakiOztel/Blog-Backend/handlers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {

	app.Get("/alluser", handlers.GetAllUser)
	app.Get("/profile/:username", handlers.GetProfilePost)
	app.Post("/cruser", handlers.CreateUser)
	app.Post("/loginuser", handlers.LoginUser)
	app.Post("/islogin", middleware.Jwtmiddleware, handlers.StillLogin)
}
