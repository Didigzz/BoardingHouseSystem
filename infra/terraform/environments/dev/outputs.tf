# Development Environment Outputs

output "web_service_url" {
  description = "URL of the web service"
  value       = module.web_service.service_url
}

output "api_service_url" {
  description = "URL of the API service"
  value       = module.api_service.service_url
}

output "database_connection_string" {
  description = "Database connection string"
  value       = module.database.connection_string
  sensitive   = true
}

output "redis_host" {
  description = "Redis host"
  value       = google_redis_instance.cache.host
}

output "storage_bucket" {
  description = "Storage bucket name"
  value       = google_storage_bucket.uploads.name
}