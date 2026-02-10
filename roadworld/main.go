package main

import (
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type World struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Type        string    `json:"type"`
	CreatedBy   string    `json:"created_by"`
	Players     int       `json:"players"`
	MaxPlayers  int       `json:"max_players"`
	IsPublic    bool      `json:"is_public"`
	CreatedAt   time.Time `json:"created_at"`
}

type Player struct {
	ID       string  `json:"id"`
	Name     string  `json:"name"`
	WorldID  string  `json:"world_id"`
	X        float64 `json:"x"`
	Y        float64 `json:"y"`
	Z        float64 `json:"z"`
	Rotation float64 `json:"rotation"`
	Avatar   string  `json:"avatar"`
}

type GameObject struct {
	ID       string  `json:"id"`
	WorldID  string  `json:"world_id"`
	Type     string  `json:"type"`
	Name     string  `json:"name"`
	X        float64 `json:"x"`
	Y        float64 `json:"y"`
	Z        float64 `json:"z"`
	Scale    float64 `json:"scale"`
	Color    string  `json:"color"`
}

var (
	worlds      = make(map[string]*World)
	players     = make(map[string]*Player)
	gameObjects = make(map[string]*GameObject)
	mu          sync.RWMutex
	upgrader    = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
)

func init() {
	worlds["earth-genesis"] = &World{
		ID:          "earth-genesis",
		Name:        "Earth - Beginning",
		Description: "Experience Earth from the very beginning",
		Type:        "open-world",
		CreatedBy:   "system",
		Players:     0,
		MaxPlayers:  1000,
		IsPublic:    true,
		CreatedAt:   time.Now(),
	}
	
	worlds["metaverse-hub"] = &World{
		ID:          "metaverse-hub",
		Name:        "Metaverse Hub",
		Description: "Central hub for virtual companies and games",
		Type:        "hub",
		CreatedBy:   "system",
		Players:     0,
		MaxPlayers:  5000,
		IsPublic:    true,
		CreatedAt:   time.Now(),
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()
	
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.GET("/health", healthCheck)
	r.GET("/", root)
	
	api := r.Group("/api")
	{
		api.GET("/worlds", getWorlds)
		api.GET("/worlds/:id", getWorld)
		api.POST("/worlds", createWorld)
		api.GET("/players", getPlayers)
		api.POST("/players", createPlayer)
		api.PUT("/players/:id", updatePlayer)
		api.GET("/objects", getGameObjects)
		api.POST("/objects", createGameObject)
		api.GET("/stats", getStats)
	}
	
	r.GET("/ws", handleWebSocket)

	log.Printf("🌍 RoadWorld running on port %s", port)
	log.Printf("   Health: http://localhost:%s/health", port)
	log.Printf("   API: http://localhost:%s/api", port)
	log.Printf("   WebSocket: ws://localhost:%s/ws", port)
	
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}

func healthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status":    "healthy",
		"service":   "RoadWorld API",
		"version":   "1.0.0",
		"timestamp": time.Now().Format(time.RFC3339),
		"stats": gin.H{
			"total_worlds":  len(worlds),
			"active_players": len(players),
			"total_objects":  len(gameObjects),
		},
	})
}

func root(c *gin.Context) {
	c.JSON(200, gin.H{
		"name":        "RoadWorld",
		"description": "Metaverse & Game Creation Platform",
		"version":     "1.0.0",
		"features": []string{
			"Open world Earth simulation",
			"Virtual company headquarters",
			"Game creation tools",
			"Real-time multiplayer",
			"WebGL rendering",
			"3D asset management",
		},
		"endpoints": gin.H{
			"worlds":  "/api/worlds",
			"players": "/api/players",
			"objects": "/api/objects",
			"stats":   "/api/stats",
			"ws":      "/ws",
		},
	})
}

func getWorlds(c *gin.Context) {
	mu.RLock()
	defer mu.RUnlock()
	
	worldList := make([]*World, 0, len(worlds))
	for _, w := range worlds {
		worldList = append(worldList, w)
	}
	
	c.JSON(200, gin.H{
		"success": true,
		"count":   len(worldList),
		"data":    worldList,
	})
}

func getWorld(c *gin.Context) {
	id := c.Param("id")
	
	mu.RLock()
	world, exists := worlds[id]
	mu.RUnlock()
	
	if !exists {
		c.JSON(404, gin.H{"success": false, "error": "World not found"})
		return
	}
	
	c.JSON(200, gin.H{"success": true, "data": world})
}

func createWorld(c *gin.Context) {
	var world World
	if err := c.ShouldBindJSON(&world); err != nil {
		c.JSON(400, gin.H{"success": false, "error": err.Error()})
		return
	}
	
	world.CreatedAt = time.Now()
	world.Players = 0
	
	mu.Lock()
	worlds[world.ID] = &world
	mu.Unlock()
	
	c.JSON(201, gin.H{"success": true, "data": world})
}

func getPlayers(c *gin.Context) {
	worldID := c.Query("world_id")
	
	mu.RLock()
	defer mu.RUnlock()
	
	playerList := make([]*Player, 0)
	for _, p := range players {
		if worldID == "" || p.WorldID == worldID {
			playerList = append(playerList, p)
		}
	}
	
	c.JSON(200, gin.H{
		"success": true,
		"count":   len(playerList),
		"data":    playerList,
	})
}

func createPlayer(c *gin.Context) {
	var player Player
	if err := c.ShouldBindJSON(&player); err != nil {
		c.JSON(400, gin.H{"success": false, "error": err.Error()})
		return
	}
	
	mu.Lock()
	players[player.ID] = &player
	if world, exists := worlds[player.WorldID]; exists {
		world.Players++
	}
	mu.Unlock()
	
	c.JSON(201, gin.H{"success": true, "data": player})
}

func updatePlayer(c *gin.Context) {
	id := c.Param("id")
	
	var updates Player
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(400, gin.H{"success": false, "error": err.Error()})
		return
	}
	
	mu.Lock()
	if player, exists := players[id]; exists {
		player.X = updates.X
		player.Y = updates.Y
		player.Z = updates.Z
		player.Rotation = updates.Rotation
		mu.Unlock()
		c.JSON(200, gin.H{"success": true, "data": player})
	} else {
		mu.Unlock()
		c.JSON(404, gin.H{"success": false, "error": "Player not found"})
	}
}

func getGameObjects(c *gin.Context) {
	worldID := c.Query("world_id")
	
	mu.RLock()
	defer mu.RUnlock()
	
	objectList := make([]*GameObject, 0)
	for _, obj := range gameObjects {
		if worldID == "" || obj.WorldID == worldID {
			objectList = append(objectList, obj)
		}
	}
	
	c.JSON(200, gin.H{
		"success": true,
		"count":   len(objectList),
		"data":    objectList,
	})
}

func createGameObject(c *gin.Context) {
	var obj GameObject
	if err := c.ShouldBindJSON(&obj); err != nil {
		c.JSON(400, gin.H{"success": false, "error": err.Error()})
		return
	}
	
	mu.Lock()
	gameObjects[obj.ID] = &obj
	mu.Unlock()
	
	c.JSON(201, gin.H{"success": true, "data": obj})
}

func getStats(c *gin.Context) {
	mu.RLock()
	defer mu.RUnlock()
	
	c.JSON(200, gin.H{
		"success": true,
		"data": gin.H{
			"worlds": gin.H{
				"total":      len(worlds),
				"public":     countPublicWorlds(),
				"with_players": countWorldsWithPlayers(),
			},
			"players": gin.H{
				"total":  len(players),
				"online": len(players),
			},
			"objects": gin.H{
				"total": len(gameObjects),
			},
		},
	})
}

func countPublicWorlds() int {
	count := 0
	for _, w := range worlds {
		if w.IsPublic {
			count++
		}
	}
	return count
}

func countWorldsWithPlayers() int {
	count := 0
	for _, w := range worlds {
		if w.Players > 0 {
			count++
		}
	}
	return count
}

func handleWebSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}
	defer conn.Close()
	
	log.Println("New WebSocket connection established")
	
	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("WebSocket read error:", err)
			break
		}
		
		log.Printf("Received: %s", message)
		
		if err := conn.WriteMessage(messageType, message); err != nil {
			log.Println("WebSocket write error:", err)
			break
		}
	}
}
