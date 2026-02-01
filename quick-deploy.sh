#!/bin/bash

# Quick Deploy Script for Pre-configured VPS
echo "🚀 Deploying Capstone Image API..."

# Configure firewall
echo "🔒 Configuring firewall..."
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Clone repository
echo "📥 Cloning repository..."
git clone https://github.com/thanhsang52/node53-capstone-image-sharing-api.git
cd node53-capstone-image-sharing-api

# Setup environment
echo "⚙️ Setting up environment..."
cp .env.example .env

echo "✅ Setup completed!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env file:"
echo "   nano .env"
echo ""
echo "2. Deploy application:"
echo "   chmod +x deploy.sh"
echo "   ./deploy.sh"
echo ""
echo "🌐 Your API will be available at:"
echo "   http://146.190.108.212"
echo "   http://node53-capstone-image.sangshare.cloud"