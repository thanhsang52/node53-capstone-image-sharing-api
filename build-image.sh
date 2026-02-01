#!/bin/bash

# Build and push Docker image script
echo "🔨 Building Docker image locally..."

# Build image
docker build -t thanhsang52/capstone-image-api:latest .

# Push to Docker Hub (optional)
echo "📤 Pushing to Docker Hub..."
docker push thanhsang52/capstone-image-api:latest

echo "✅ Image built and pushed successfully!"
echo "Update docker-compose.yml to use: thanhsang52/capstone-image-api:latest"