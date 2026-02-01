#!/bin/bash

# Deploy script for VPS with Nginx Proxy Manager
echo "🚀 Starting deployment..."

# Stop existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Pull latest changes from GitHub
echo "📥 Pulling latest changes..."
git pull origin main

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec backend npx prisma migrate deploy

# Show container status
echo "📊 Container status:"
docker-compose ps

echo "✅ Deployment completed!"
echo "🔧 Backend running on: http://146.190.108.212:3069"
echo "📚 API Docs: http://146.190.108.212:3069/api"
echo ""
echo "🔍 Configure Nginx Proxy Manager:"
echo "   Forward Host: node53-capstone-image.sangshare.cloud"
echo "   Forward Port: 3069"
echo "   Target: 146.190.108.212:3069"

# Optional: Clean up unused images
echo "🧹 Cleaning up unused Docker images..."
docker image prune -f