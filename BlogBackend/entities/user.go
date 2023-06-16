package entities

type User struct {
	ID         int    `json:"id" gorm:"primaryKey"`
	Username   string `json:"Username" gorm:"not null"`
	Email      string `json:"Email" gorm:"not null"`
	Password   string `json:"Password" gorm:"not null"`
	Followers  int    `json:"Followers" gorm:"default:0"`
	Following  int    `json:"Following" gorm:"default:0"`
	ProfileImg string `json:"profileimg"`
	Posts      []Post `json:"posts"`
}

type UserRequest struct {
	Email    string `json:"Email"`
	Password string `json:"Password"`
}

type UserResponse struct {
	ID       int    `json:"user"`
	Username string `json:"Username"`
}

type UserPostResponse struct {
	ID    int    `json:"id"`
	Posts []Post `json:"posts"`
}
