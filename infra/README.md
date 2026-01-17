# Infrastructure

This directory contains all infrastructure-related configurations for deploying BHMS to Google Cloud Platform.

## Structure

```
infra/
├── docker/           # Docker configurations
├── terraform/        # Terraform infrastructure as code
└── monitoring/       # Monitoring and observability
```

## Docker (`infra/docker/`)

### Files
- `docker-compose.yml` - Production Docker setup
- `docker-compose.dev.yml` - Development Docker setup

### Usage
```bash
# Development
docker-compose -f infra/docker/docker-compose.dev.yml up

# Production
docker-compose -f infra/docker/docker-compose.yml up
```

## Terraform (`infra/terraform/`)

Infrastructure as Code for Google Cloud Platform deployment.

### Structure
```
terraform/
├── environments/
│   ├── dev/          # Development environment
│   └── production/   # Production environment
└── modules/
    ├── vpc/          # VPC network module
    ├── cloud-run/    # Cloud Run service module
    └── cloud-sql/    # Cloud SQL database module
```

### Resources Created
- **VPC Network** - Private network for services
- **Cloud Run** - Serverless containers for web and API
- **Cloud SQL** - Managed PostgreSQL database
- **Redis** - Memorystore for caching
- **Cloud Storage** - File uploads and static assets

### Usage
```bash
cd infra/terraform/environments/dev

# Initialize
terraform init

# Plan
terraform plan -var="project_id=your-gcp-project"

# Apply
terraform apply -var="project_id=your-gcp-project"
```

### Environment Variables
Set these in your environment or `.tfvars` file:
- `project_id` - Your GCP project ID
- `region` - GCP region (default: us-central1)

## Monitoring (`infra/monitoring/`)

Observability stack with Prometheus, Grafana, and Loki.

### Components
- **Prometheus** - Metrics collection
- **Grafana** - Dashboards and visualization
- **Loki** - Log aggregation
- **Promtail** - Log shipping

### Usage
```bash
cd infra/monitoring

# Start monitoring stack
docker-compose up -d

# Access dashboards
open http://localhost:3030  # Grafana (admin/admin)
open http://localhost:9090  # Prometheus
```

### Metrics Collected
- API response times
- Database query performance
- System resource usage
- Application errors
- User activity

## Deployment Architecture

```
Users
  ↓
Cloud Load Balancer
  ↓
  ├─→ Cloud Run (Web - Next.js)
  │   └─→ Auto-scaling 0-5 instances
  │
  └─→ Cloud Run (API - Express)
      └─→ Auto-scaling 0-10 instances
      ↓
      ├─→ Cloud SQL (PostgreSQL)
      │   ├─→ Primary (write)
      │   └─→ Read replica (read)
      │
      ├─→ Memorystore (Redis)
      │   └─→ Caching layer
      │
      └─→ Cloud Storage
          └─→ File uploads
```

## Security

### Network Security
- Private VPC with firewall rules
- Cloud SQL private IP
- IAM roles and permissions

### Application Security
- HTTPS only
- Authentication required
- Input validation
- SQL injection protection

## Scaling

### Automatic Scaling
- Cloud Run auto-scales based on traffic
- Database read replicas for high load
- Redis caching reduces database load

### Manual Scaling
- Increase Cloud Run instance limits
- Upgrade database tier
- Add read replicas

## Monitoring & Alerts

### Key Metrics
- Response time < 200ms
- Error rate < 1%
- Database connections < 80%
- Memory usage < 80%

### Alerts
- High error rates
- Slow response times
- Database connection issues
- Service downtime

## Costs

### Development Environment
- Cloud Run: ~$5-10/month
- Cloud SQL: ~$10-20/month
- Redis: ~$5/month
- Storage: ~$1-5/month
- **Total: ~$20-40/month**

### Production Environment
- Cloud Run: ~$20-50/month
- Cloud SQL: ~$50-100/month
- Redis: ~$20/month
- Storage: ~$5-20/month
- **Total: ~$95-190/month**

## Getting Started

1. **Set up GCP project**
   ```bash
   gcloud projects create your-project-id
   gcloud config set project your-project-id
   ```

2. **Enable billing and APIs**
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable sql-component.googleapis.com
   ```

3. **Deploy infrastructure**
   ```bash
   cd infra/terraform/environments/dev
   terraform init
   terraform apply
   ```

4. **Build and deploy apps**
   ```bash
   # Build Docker images
   docker build -f apps/web/Dockerfile -t gcr.io/your-project/bhms-web .
   docker build -f apps/api/Dockerfile -t gcr.io/your-project/bhms-api .
   
   # Push to registry
   docker push gcr.io/your-project/bhms-web
   docker push gcr.io/your-project/bhms-api
   ```

5. **Set up monitoring**
   ```bash
   cd infra/monitoring
   docker-compose up -d
   ```