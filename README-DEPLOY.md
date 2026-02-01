# 🚀 Capstone Image API - Docker Deployment

## 📋 Prerequisites

- Docker & Docker Compose installed on VPS
- Domain name pointed to your VPS IP
- Cloudinary account for image storage

## 🛠️ Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd capstone-image-api
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

**Required Environment Variables:**
```env
DB_ROOT_PASSWORD=your_secure_root_password
DB_NAME=capstone_image_api
DB_USER=capstone_user
DB_PASSWORD=your_secure_db_password
JWT_SECRET=your_very_long_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Update Domain Configuration
```bash
# Update nginx configuration
nano nginx/nginx.conf
# Replace 'your-domain.com' with your actual domain

# Update frontend environment
nano frontend/.env
# Set NEXT_PUBLIC_BACKEND_URL=http://your-domain.com/api
```

### 4. Deploy Application
```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🔧 Manual Deployment Commands

```bash
# Build and start all services
docker-compose up -d --build

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 Service URLs

- **Frontend**: http://your-domain.com
- **Backend API**: http://your-domain.com/api
- **Database**: Internal (port 3306)

## 🔍 Troubleshooting

### Check Container Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

### Database Issues
```bash
# Access MySQL container
docker-compose exec mysql mysql -u root -p

# Reset database
docker-compose down -v
docker-compose up -d
```

## 🔒 SSL Configuration (Optional)

1. Obtain SSL certificates (Let's Encrypt recommended)
2. Place certificates in `nginx/ssl/` directory
3. Uncomment HTTPS configuration in `nginx/nginx.conf`
4. Restart nginx: `docker-compose restart nginx`

## 📝 Maintenance

### Update Application
```bash
git pull origin main
./deploy.sh
```

### Backup Database
```bash
docker-compose exec mysql mysqldump -u root -p capstone_image_api > backup.sql
```

### Monitor Resources
```bash
docker stats
```

## 🆘 Support

If you encounter issues:
1. Check container logs
2. Verify environment variables
3. Ensure domain DNS is configured correctly
4. Check firewall settings (ports 80, 443, 3000, 3069)