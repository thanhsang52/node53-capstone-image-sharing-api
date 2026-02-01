# 🚀 Deployment Guide - DigitalOcean VPS

## 📋 Server Information
- **Server**: ubuntu-s-2vcpu-2gb-sgp1-01
- **IP**: 146.190.108.212
- **Domain**: node53-capstone-image.sangshare.cloud
- **OS**: Ubuntu 22.04 LTS

## 🛠️ Step-by-Step Deployment

### 1. Connect to VPS
```bash
ssh root@146.190.108.212
```

### 2. Run Setup Script
```bash
# Download and run setup script
curl -fsSL https://raw.githubusercontent.com/thanhsang52/node53-capstone-image-sharing-api/main/vps-setup.sh -o vps-setup.sh
chmod +x vps-setup.sh
./vps-setup.sh
```

### 3. Configure Environment
```bash
cd /home/$USER/apps/node53-capstone-image-sharing-api
nano .env
```

**Required Environment Variables:**
```env
# Database
DB_ROOT_PASSWORD=your_secure_root_password_123
DB_NAME=capstone_image_api
DB_USER=capstone_user
DB_PASSWORD=your_secure_db_password_456

# JWT
JWT_SECRET=your_very_long_jwt_secret_key_here_min_32_chars

# Cloudinary (your actual values)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Deploy Application
```bash
chmod +x deploy.sh
./deploy.sh
```

### 5. DNS Configuration
Point your domain to the VPS IP:
- **Type**: A Record
- **Name**: node53-capstone-image
- **Value**: 146.190.108.212
- **TTL**: 300 (5 minutes)

## 🌐 Access URLs

### Immediate Access (IP)
- **API**: http://146.190.108.212
- **Swagger Docs**: http://146.190.108.212/api

### After DNS Setup
- **API**: http://node53-capstone-image.sangshare.cloud
- **Swagger Docs**: http://node53-capstone-image.sangshare.cloud/api

## 🔧 Management Commands

### Check Status
```bash
cd /home/$USER/apps/node53-capstone-image-sharing-api
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f
docker-compose logs backend
docker-compose logs mysql
docker-compose logs nginx
```

### Restart Services
```bash
docker-compose restart
docker-compose restart backend
```

### Update Application
```bash
git pull origin main
./deploy.sh
```

### Stop Services
```bash
docker-compose down
```

## 🔒 Security Checklist

- ✅ UFW firewall enabled (ports 22, 80, 443)
- ✅ Strong database passwords
- ✅ JWT secret key (32+ characters)
- ✅ Environment variables secured

## 📊 Monitoring

### System Resources
```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Docker stats
docker stats
```

### Application Health
```bash
# Test API endpoint
curl http://146.190.108.212/api

# Check database connection
docker-compose exec mysql mysql -u capstone_user -p capstone_image_api
```

## 🆘 Troubleshooting

### Common Issues

1. **Port 80 already in use**
   ```bash
   sudo lsof -i :80
   sudo systemctl stop apache2  # if Apache is running
   ```

2. **Docker permission denied**
   ```bash
   sudo usermod -aG docker $USER
   # Logout and login again
   ```

3. **Database connection failed**
   ```bash
   docker-compose logs mysql
   # Check DB credentials in .env
   ```

4. **Domain not resolving**
   ```bash
   nslookup node53-capstone-image.sangshare.cloud
   # Wait for DNS propagation (up to 24 hours)
   ```

## 📞 Support

If you encounter issues:
1. Check logs: `docker-compose logs`
2. Verify .env configuration
3. Ensure DNS is properly configured
4. Check firewall settings: `sudo ufw status`