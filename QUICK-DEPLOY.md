# 🚀 Quick Deployment Guide

## VPS Information
- **IP**: 146.190.108.212
- **Domain**: node53-capstone-image.sangshare.cloud
- **Pre-installed**: Git, Docker, Docker Compose

## ⚡ Quick Deploy (5 minutes)

### 1. Connect to VPS
```bash
ssh root@146.190.108.212
```

### 2. Run Quick Deploy
```bash
curl -fsSL https://raw.githubusercontent.com/thanhsang52/node53-capstone-image-sharing-api/main/quick-deploy.sh -o quick-deploy.sh
chmod +x quick-deploy.sh
./quick-deploy.sh
```

### 3. Configure Environment
```bash
cd node53-capstone-image-sharing-api
nano .env
```

**Fill in these values:**
```env
DB_ROOT_PASSWORD=your_secure_password_123
DB_PASSWORD=your_db_password_456
JWT_SECRET=your_jwt_secret_min_32_characters_long
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Deploy
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🌐 Access Your API

- **Direct IP**: http://146.190.108.212
- **API Docs**: http://146.190.108.212/api
- **Domain** (after DNS): http://node53-capstone-image.sangshare.cloud

## 🔧 Management Commands

```bash
# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Update
git pull && ./deploy.sh
```

## 📍 DNS Setup
Point A record: `node53-capstone-image.sangshare.cloud` → `146.190.108.212`

That's it! Your API is ready! 🎉