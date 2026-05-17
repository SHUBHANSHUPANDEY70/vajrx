package main

import (
	"log"
	"os"

	"github.com/SHUBHANSHUPANDEY70/vajrx/backend/internal/db"
	"github.com/SHUBHANSHUPANDEY70/vajrx/backend/internal/handlers"
	"github.com/SHUBHANSHUPANDEY70/vajrx/backend/internal/middleware"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env if present (dev only)
	_ = godotenv.Load()

	// Connect DB
	if err := db.Connect(); err != nil {
		log.Fatalf("DB connection failed: %v", err)
	}
	if err := db.Migrate(); err != nil {
		log.Fatalf("DB migration failed: %v", err)
	}

	r := gin.Default()

	// CORS
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	api := r.Group("/api")
	{
		api.POST("/contact", handlers.PostContact)
		api.POST("/idea", handlers.PostIdea)

		admin := api.Group("/admin")
		admin.POST("/login", handlers.AdminLogin)
		admin.Use(middleware.RequireAuth())
		{
			admin.GET("/contacts", handlers.GetContacts)
			admin.GET("/ideas", handlers.GetIdeas)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("VajrX API running on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
