package entities

type Post struct {
	ID         int    `json:"id" gorm:"primaryKey"`
	Media_file string `json:"media_file" gorm:"not null"`
	Desc       string `json:"desc"`
	Like       int    `json:"like"  gorm:"default:0"`
	UserID     int    `json:"user_id"  gorm:"not null"`
	User       User
	Comment    []Comment `json:"comments"`
}

type PostRequest struct {
	Desc string `json:"Desc"`
}

type PostResponse struct {
	Media_file string `json:"media_file"`
	Desc       string `json:"desc"`
	Username   string `json:"Username"`
}
type LikePost struct {
	ID int `json:"id"`
}

type UpdatePost struct {
	Like int `json:"like"`
}
