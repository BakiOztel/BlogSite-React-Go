package entities

type Comment struct {
	ID       int    `json:"id" gorm:"primaryKey"`
	Username string `json:"username" gorm:"not null"`
	Text     string `json:"comment"`
	PostId   int    `json:"postid"`
	Post     Post
}

type CommentRequest struct {
	PostId int    `json:"postid"`
	Text   string `json:"text"`
}
