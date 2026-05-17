package models

import "time"

type ContactSubmission struct {
	ID        uint64    `db:"id"         json:"id"`
	Name      string    `db:"name"       json:"name"`
	Email     string    `db:"email"      json:"email"`
	Phone     string    `db:"phone"      json:"phone"`
	Message   string    `db:"message"    json:"message"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}
