
# Kubernetes Deployment Guide


This guide explains how to deploy the Fredrik Hansen Portfolio application on Kubernetes using Docker and Helm.

## Prerequisites

- Docker installed and running
- Kubernetes cluster access
- Helm 3.x installed
- kubectl configured to access your cluster

## Building the Docker Image

1. Build the Docker image:
```bash
docker build -t your-registry/portfolio:latest .
```

2. Push the image to your container registry:
```bash
docker push your-registry/portfolio:latest
```

## Deploying with Helm

1. Install the Helm chart:
```bash
helm install portfolio ./helm/portfolio
```

2. Or with custom values:
```bash
helm install portfolio ./helm/portfolio -f custom-values.yaml
```

3. Upgrade an existing deployment:
```bash
helm upgrade portfolio ./helm/portfolio
```

## Configuration

### Image Configuration
Update the image repository in `helm/portfolio/values.yaml`:
```yaml
image:
  repository: your-registry/portfolio
  tag: "latest"
```

### Ingress Configuration
To enable ingress, update `helm/portfolio/values.yaml`:
```yaml
ingress:
  enabled: true
  className: "nginx"
  hosts:
    - host: portfolio.yourdomain.com
      paths:
        - path: /
          pathType: Prefix
```

### Autoscaling
To enable horizontal pod autoscaling:
```yaml
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

## Monitoring

Check the deployment status:
```bash
kubectl get pods -l app.kubernetes.io/name=portfolio
kubectl get svc portfolio
```

View logs:
```bash
kubectl logs -l app.kubernetes.io/name=portfolio
```

## Uninstalling

To remove the deployment:
```bash
helm uninstall portfolio
```

## Security Features

- Non-root container execution
- Read-only root filesystem
- Security contexts applied
- Resource limits configured
- Health checks enabled

## Performance Optimizations

- Multi-stage Docker build for smaller images
- Nginx gzip compression enabled
- Static asset caching configured
- Horizontal pod autoscaling available
