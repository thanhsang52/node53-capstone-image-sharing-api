#!/bin/bash

# Docker Status Check Script
echo "🔍 Checking Docker status..."

echo "📋 All containers:"
docker ps -a

echo ""
echo "📋 Compose project containers:"
docker-compose ps -a

echo ""
echo "🔧 Docker service status:"
sudo systemctl status docker

echo ""
echo "📊 Docker system info:"
docker system df

echo ""
echo "🌐 Network status:"
docker network ls

echo ""
echo "💾 Volume status:"
docker volume ls