#!/bin/bash

# Build and push Docker image script
echo "🔨 Building Docker image..."

# Login to Docker Hub
echo "🔐 Login to Docker Hub..."
docker login

# Build image with tag
docker build -t thanhsang52/capstone-image-api:latest .

# Push to Docker Hub
echo "📤 Pushing to Docker Hub..."
docker push thanhsang52/capstone-image-api:latest

echo "✅ Image pushed successfully!"
echo "🌐 Image available at: https://hub.docker.com/r/thanhsang52/capstone-image-api"
echo "📋 Use in docker-compose: thanhsang52/capstone-image-api:latest"