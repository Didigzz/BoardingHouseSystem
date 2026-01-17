output "connection_string" {
  description = "Database connection string"
  value = "postgresql://${google_sql_user.user.name}:${random_password.db_password.result}@${google_sql_database_instance.postgres.public_ip_address}:5432/${google_sql_database.database.name}"
  sensitive = true
}

output "instance_name" {
  description = "Database instance name"
  value = google_sql_database_instance.postgres.name
}

output "database_name" {
  description = "Database name"
  value = google_sql_database.database.name
}