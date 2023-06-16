package main

import (
	"log"

	routes "github.com/BakiOztel/Blog-Backend/Routes"
	"github.com/BakiOztel/Blog-Backend/config"
	"github.com/BakiOztel/Blog-Backend/initializers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type App struct {
	Router *fiber.App
}

func main() {
	initializers.LoadVariables()
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
		AllowOrigins:     "http://localhost:3000",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))
	config.Connect()
	routes.UserRoutes(app)
	routes.PostRoutes(app)
	log.Fatal(app.Listen(":5000"))
}
