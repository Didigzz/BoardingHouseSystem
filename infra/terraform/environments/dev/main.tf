# Development Environment - BHMS
# Google Cloud Platform Infrastructure

terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# Configure the Google Cloud Provider
provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

# Enable required APIs
resource "google_project_service" "required_apis" {
  for_each = toset([
    "run.googleapis.com",
    "sql-component.googleapis.com",
    "sqladmin.googleapis.com",
    "redis.googleapis.com",
    "storage.googleapis.com",
    "cloudbuild.googleapis.com",
    "artifactregistry.googleapis.com"
  ])

  service = each.value
  disable_on_destroy = false
}

# VPC Network
module "vpc" {
  source = "../../modules/vpc"
  
  project_id = var.project_id
  region     = var.region
  env        = "dev"
}

# Cloud SQL (PostgreSQL)
module "database" {
  source = "../../modules/cloud-sql"
  
  project_id = var.project_id
  region     = var.region
  env        = "dev"
  
  database_name = "bhms-dev"
  database_user = "bhms"
  
  depends_on = [google_project_service.required_apis]
}

# Cloud Run Services
module "api_service" {
  source = "../../modules/cloud-run"
  
  project_id = var.project_id
  region     = var.region
  env        = "dev"
  
  service_name = "bhms-api"
  image        = "gcr.io/${var.project_id}/bhms-api:latest"
  port         = 3001
  
  env_vars = {
    NODE_ENV     = "development"
    DATABASE_URL = module.database.connection_string
  }
  
  depends_on = [google_project_service.required_apis]
}

module "web_service" {
  source = "../../modules/cloud-run"
  
  project_id = var.project_id
  region     = var.region
  env        = "dev"
  
  service_name = "bhms-web"
  image        = "gcr.io/${var.project_id}/bhms-web:latest"
  port         = 3000
  
  env_vars = {
    NODE_ENV           = "development"
    NEXT_PUBLIC_API_URL = module.api_service.service_url
  }
  
  depends_on = [google_project_service.required_apis]
}

# Redis Cache
resource "google_redis_instance" "cache" {
  name           = "bhms-cache-dev"
  tier           = "BASIC"
  memory_size_gb = 1
  region         = var.region
  
  depends_on = [google_project_service.required_apis]
}

# Cloud Storage Bucket
resource "google_storage_bucket" "uploads" {
  name     = "${var.project_id}-bhms-uploads-dev"
  location = var.region
  
  uniform_bucket_level_access = true
  
  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}