package handlers

import (
	"net/http"
	"strings"

	"github.com/SHUBHANSHUPANDEY70/vajrx/backend/internal/db"
	"github.com/gin-gonic/gin"
)

type contactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Message string `json:"message"`
}

func PostContact(c *gin.Context) {
	var req contactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}
	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)
	req.Phone = strings.TrimSpace(req.Phone)
	req.Message = strings.TrimSpace(req.Message)

	if req.Name == "" || req.Email == "" || req.Phone == "" || req.Message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "all fields are required"})
		return
	}

	_, err := db.DB.Exec(
		"INSERT INTO contact_submissions (name, email, phone, message) VALUES (?, ?, ?, ?)",
		req.Name, req.Email, req.Phone, req.Message,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save submission"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Contact submission received"})
}

func GetContacts(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, name, email, phone, message, created_at FROM contact_submissions ORDER BY created_at DESC")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch contacts"})
		return
	}
	defer rows.Close()

	type row struct {
		ID        uint64 `json:"id"`
		Name      string `json:"name"`
		Email     string `json:"email"`
		Phone     string `json:"phone"`
		Message   string `json:"message"`
		CreatedAt string `json:"created_at"`
	}
	var results []row
	for rows.Next() {
		var r row
		if err := rows.Scan(&r.ID, &r.Name, &r.Email, &r.Phone, &r.Message, &r.CreatedAt); err != nil {
			continue
		}
		results = append(results, r)
	}
	if results == nil {
		results = []row{}
	}
	c.JSON(http.StatusOK, results)
}
