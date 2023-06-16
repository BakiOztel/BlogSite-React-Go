package handlers

import (
	"fmt"
	"net/url"

	"github.com/BakiOztel/Blog-Backend/config"
	"github.com/BakiOztel/Blog-Backend/entities"
	"github.com/gofiber/fiber/v2"
)

func CreatePost(c *fiber.Ctx) error {
	Desc := c.FormValue("Desc")
	userId := c.Locals("user")
	file, errFile := c.FormFile("media_file")
	if errFile != nil {
		return c.Status(503).SendString(errFile.Error())
	}
	filename := file.Filename
	errSaveFile := c.SaveFile(file, fmt.Sprintf("./public/%s", filename))
	if errSaveFile != nil {
		fmt.Println("error", errSaveFile)
	}
	post := entities.Post{
		Media_file: filename,
		Desc:       Desc,
		UserID:     userId.(int),
	}

	config.Database.Create(&post)
	return c.SendStatus(200)
}

func GetAllPost(c *fiber.Ctx) error {
	var posts []entities.Post
	config.Database.Preload("User").Find(&posts)

	return c.Status(201).JSON(fiber.Map{
		"posts": posts,
	})
}

func GetProfilePost(c *fiber.Ctx) error {
	var user entities.User

	// non-english karakterler için
	params, err := url.QueryUnescape(c.Params("username"))

	if err != nil {
		fmt.Println(err)
	}

	config.Database.Preload("Posts").Find(&user, "username=?", params)
	if user.ID == 0 {
		return c.Status(401).SendString("böyle bir hesap yok")
	}
	return c.Status(200).JSON(&fiber.Map{
		"username":  user.Username,
		"posts":     user.Posts,
		"followers": user.Followers,
		"following": user.Following,
	})
}

func LikePost(c *fiber.Ctx) error {
	var likepost entities.LikePost
	var post entities.Post
	if err := c.BodyParser(&likepost); err != nil {
		return c.Status(503).SendString(err.Error())
	}
	config.Database.Find(&post, "ID=?", likepost.ID)
	if post.ID == 0 {
		return c.Status(503).SendString("post bulunamadı")
	}
	post.Like = post.Like + 1
	config.Database.Save(&post)
	return c.Status(200).JSON(fiber.Map{
		"succes": "ok",
	})
}

func GetPost(c *fiber.Ctx) error {
	var post entities.Post
	config.Database.Preload("User").Preload("Comment").Find(&post, "ID=?", c.Params("postid"))
	if post.ID == 0 {
		return c.Status(503).SendString("post bulunamadı")
	}
	return c.Status(200).JSON(post)

}

func CommentPost(c *fiber.Ctx) error {
	var comment entities.CommentRequest
	id := c.Locals("user")
	var user entities.User
	if err := c.BodyParser(&comment); err != nil {
		return c.Status(503).SendString(err.Error())
	}

	config.Database.Preload("Posts").Find(&user, "ID=?", id)
	if user.ID == 0 {
		return c.Status(503).SendString("böyle bir hesap yok bulunamadı")
	}
	Comment := entities.Comment{
		Username: user.Username,
		Text:     comment.Text,
		PostId:   comment.PostId,
	}
	config.Database.Create(&Comment)
	return c.Status(200).JSON(Comment)
}
