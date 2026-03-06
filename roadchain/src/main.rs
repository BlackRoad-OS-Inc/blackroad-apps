use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use serde::{Deserialize, Serialize};
use sha2::{Sha256, Digest};
use std::sync::Mutex;
use chrono::Utc;
use uuid::Uuid;
use std::env;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Block {
    index: u64,
    timestamp: String,
    data: String,
    previous_hash: String,
    hash: String,
    nonce: u64,
}

struct AppState {
    blockchain: Mutex<Vec<Block>>,
}

impl Block {
    fn new(index: u64, data: String, previous_hash: String) -> Self {
        let mut block = Block {
            index,
            timestamp: Utc::now().to_rfc3339(),
            data,
            previous_hash,
            hash: String::new(),
            nonce: 0,
        };
        block.hash = block.calculate_hash();
        block
    }

    fn calculate_hash(&self) -> String {
        let input = format!(
            "{}{}{}{}{}",
            self.index, self.timestamp, self.data, self.previous_hash, self.nonce
        );
        let mut hasher = Sha256::new();
        hasher.update(input.as_bytes());
        hex::encode(hasher.finalize())
    }
}

async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "healthy",
        "service": "RoadChain",
        "version": "1.0.0"
    }))
}

async fn root() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "name": "RoadChain",
        "description": "Blockchain Verification System"
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let addr = format!("0.0.0.0:{}", port);
    let allowed_origin = env::var("CORS_ORIGIN").unwrap_or_else(|_| "http://localhost:3000".to_string());

    let genesis = Block::new(0, "Genesis".to_string(), "0".to_string());
    let app_state = web::Data::new(AppState {
        blockchain: Mutex::new(vec![genesis]),
    });
    
    println!("RoadChain running on port {}", port);
    
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(&allowed_origin)
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec!["Content-Type", "Authorization"])
            .max_age(3600);
        App::new()
            .wrap(cors)
            .app_data(app_state.clone())
            .route("/health", web::get().to(health_check))
            .route("/api/health", web::get().to(health_check))
            .route("/", web::get().to(root))
    })
    .bind(&addr)?
    .run()
    .await
}
