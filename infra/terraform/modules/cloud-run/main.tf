# Cloud Run Service Module

resource "google_cloud_run_service" "service" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      containers {
        image = var.image
        
        ports {
          container_port = var.port
        }

        resources {
          limits = {
            cpu    = var.env == "production" ? "2000m" : "1000m"
            memory = var.env == "production" ? "2Gi" : "1Gi"
          }
        }

        dynamic "env" {
          for_each = var.env_vars
          content {
            name  = env.key
            value = env.value
          }
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = var.env == "production" ? "10" : "5"
        "autoscaling.knative.dev/minScale" = var.env == "production" ? "1" : "0"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Allow unauthenticated access
resource "google_cloud_run_service_iam_member" "public" {
  service  = google_cloud_run_service.service.name
  location = google_cloud_run_service.service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}