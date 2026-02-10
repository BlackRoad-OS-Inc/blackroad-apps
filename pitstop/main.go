package main

import (
	"github.com/gin-gonic/gin"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()
	
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "healthy", "service": "PitStop"})
	})
	
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"name": "PitStop",
			"description": "Infrastructure Dashboard & Monitoring",
			"features": []string{
				"Real-time metrics",
				"Container management",
				"DNS management",
				"Deployment tracking",
				"Resource monitoring",
			},
		})
	})
	
	r.Run(":" + port)
}
