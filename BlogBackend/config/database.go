package config

import (
	"github.com/BakiOztel/Blog-Backend/entities"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DATABASE_URI string = "root:Root@tcp(localhost:3306)/deneme?charset=utf8mb4&parseTime=True&loc=Local"

var Database *gorm.DB

func Connect() error {
	var err error

	Database, err = gorm.Open(mysql.Open(DATABASE_URI), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})

	if err != nil {
		panic(err)
	}
	Database.AutoMigrate(&entities.User{},
		&entities.Post{},
		&entities.Comment{},
	)
	return nil
}
