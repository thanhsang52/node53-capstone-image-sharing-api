#!/bin/bash

# VPS Setup Script for DigitalOcean Ubuntu
echo "🚀 Setting up VPS for Capstone Image API..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
sudo apt install docker-compose -y

# Install Git (if not installed)
echo "📥 Installing Git..."
sudo apt install git -y

# Install UFW and configure firewall
echo "🔒 Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Create app directory
echo "📁 Creating application directory..."
mkdir -p /home/$USER/apps
cd /home/$USER/apps

# Clone repository
echo "📥 Cloning repository..."
git clone https://github.com/thanhsang52/node53-capstone-image-sharing-api.git
cd node53-capstone-image-sharing-api

# Copy environment template
echo "⚙️ Setting up environment..."
cp .env.example .env

echo "✅ VPS setup completed!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env file with your configuration:"
echo "   nano .env"
echo ""
echo "2. Run deployment:"
echo "   chmod +x deploy.sh"
echo "   ./deploy.sh"
echo ""
echo "🌐 Your API will be available at:"
echo "   http://146.190.108.212"
echo "   http://node53-capstone-image.sangshare.cloud (after DNS setup)"