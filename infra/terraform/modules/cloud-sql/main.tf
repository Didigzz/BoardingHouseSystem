# Cloud SQL PostgreSQL Module

resource "random_password" "db_password" {
  length  = 16
  special = true
}

resource "google_sql_database_instance" "postgres" {
  name             = "bhms-postgres-${var.env}"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier = var.env == "production" ? "db-n1-standard-2" : "db-f1-micro"
    
    disk_size = var.env == "production" ? 100 : 20
    disk_type = "PD_SSD"
    
    backup_configuration {
      enabled                        = true
      start_time                     = "03:00"
      point_in_time_recovery_enabled = true
      backup_retention_settings {
        retained_backups = 7
      }
    }

    ip_configuration {
      ipv4_enabled = true
      authorized_networks {
        name  = "all"
        value = "0.0.0.0/0"
      }
    }

    database_flags {
      name  = "log_statement"
      value = "all"
    }
  }

  deletion_protection = var.env == "production" ? true : false
}

resource "google_sql_database" "database" {
  name     = var.database_name
  instance = google_sql_database_instance.postgres.name
}

resource "google_sql_user" "user" {
  name     = var.database_user
  instance = google_sql_database_instance.postgres.name
  password = random_password.db_password.result
}