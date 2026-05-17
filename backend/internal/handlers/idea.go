package handlers

import (
	"net/http"
	"strings"

	"github.com/SHUBHANSHUPANDEY70/vajrx/backend/internal/db"
	"github.com/gin-gonic/gin"
)

type ideaRequest struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	IdeaDetails string `json:"ideaDetails"`
}

func PostIdea(c *gin.Context) {
	var req ideaRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}
	req.Name = strings.TrimSpace(req.Name)
	req.Email = strings.TrimSpace(req.Email)
	req.IdeaDetails = strings.TrimSpace(req.IdeaDetails)

	if req.Name == "" || req.Email == "" || req.IdeaDetails == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "all fields are required"})
		return
	}

	_, err := db.DB.Exec(
		"INSERT INTO idea_submissions (name, email, idea_details) VALUES (?, ?, ?)",
		req.Name, req.Email, req.IdeaDetails,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save submission"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Idea submission received"})
}

func GetIdeas(c *gin.Context) {
	rows, err := db.DB.Query("SELECT id, name, email, idea_details, created_at FROM idea_submissions ORDER BY created_at DESC")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch ideas"})
		return
	}
	defer rows.Close()

	type row struct {
		ID          uint64 `json:"id"`
		Name        string `json:"name"`
		Email       string `json:"email"`
		IdeaDetails string `json:"idea_details"`
		CreatedAt   string `json:"created_at"`
	}
	var results []row
	for rows.Next() {
		var r row
		if err := rows.Scan(&r.ID, &r.Name, &r.Email, &r.IdeaDetails, &r.CreatedAt); err != nil {
			continue
		}
		results = append(results, r)
	}
	if results == nil {
		results = []row{}
	}
	c.JSON(http.StatusOK, results)
}
