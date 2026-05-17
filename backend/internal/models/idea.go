package models

import "time"

type IdeaSubmission struct {
	ID          uint64    `db:"id"           json:"id"`
	Name        string    `db:"name"         json:"name"`
	Email       string    `db:"email"        json:"email"`
	IdeaDetails string    `db:"idea_details" json:"idea_details"`
	CreatedAt   time.Time `db:"created_at"   json:"created_at"`
}
