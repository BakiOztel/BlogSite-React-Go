package routes

import (
	middleware "github.com/BakiOztel/Blog-Backend/Middleware"
	"github.com/BakiOztel/Blog-Backend/handlers"
	"github.com/gofiber/fiber/v2"
)

func PostRoutes(app *fiber.App) {

	app.Get("/allpost", handlers.GetAllPost)
	app.Get("/post/:postid", handlers.GetPost)
	app.Post("/crpost", middleware.Jwtmiddleware, handlers.CreatePost)
	app.Post("/likepost", handlers.LikePost)
	app.Post("/comment", middleware.Jwtmiddleware, handlers.CommentPost)
}
