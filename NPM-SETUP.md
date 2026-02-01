# 🔧 Nginx Proxy Manager Setup

## VPS Configuration
- **VPS IP**: 146.190.108.212
- **Backend Port**: 3069
- **Domain**: node53-capstone-image.sangshare.cloud

## 🚀 Deployment Steps

### 1. Deploy Backend
```bash
ssh root@146.190.108.212
git clone https://github.com/thanhsang52/node53-capstone-image-sharing-api.git
cd node53-capstone-image-sharing-api
cp .env.example .env
nano .env  # Configure your values
chmod +x deploy.sh
./deploy.sh
```

### 2. Configure Nginx Proxy Manager

#### Access NPM Dashboard
- URL: `http://146.190.108.212:81` (or your NPM port)
- Login with your NPM credentials

#### Add Proxy Host
1. **Go to**: Proxy Hosts → Add Proxy Host

2. **Details Tab**:
   - **Domain Names**: `node53-capstone-image.sangshare.cloud`
   - **Scheme**: `http`
   - **Forward Hostname/IP**: `146.190.108.212`
   - **Forward Port**: `3069`
   - **Cache Assets**: ✅ (optional)
   - **Block Common Exploits**: ✅
   - **Websockets Support**: ✅

3. **SSL Tab** (Optional):
   - **SSL Certificate**: Request a new SSL Certificate
   - **Force SSL**: ✅
   - **HTTP/2 Support**: ✅
   - **HSTS Enabled**: ✅

4. **Advanced Tab** (Optional):
   ```nginx
   # Add CORS headers for API
   add_header 'Access-Control-Allow-Origin' '*' always;
   add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
   add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
   ```

5. **Save** the configuration

## 🌐 Access URLs

### After NPM Configuration:
- **API**: https://node53-capstone-image.sangshare.cloud
- **API Docs**: https://node53-capstone-image.sangshare.cloud/api

### Direct Access (for testing):
- **API**: http://146.190.108.212:3069
- **API Docs**: http://146.190.108.212:3069/api

## 🔍 Verification

### Test API Endpoint
```bash
curl https://node53-capstone-image.sangshare.cloud/api
```

### Check Backend Status
```bash
curl http://146.190.108.212:3069/api
```

## 📋 DNS Requirements

Ensure your domain DNS points to the VPS:
- **Type**: A Record
- **Name**: node53-capstone-image
- **Value**: 146.190.108.212
- **TTL**: 300

## 🛠️ Troubleshooting

### Backend not responding
```bash
docker-compose ps
docker-compose logs backend
```

### NPM proxy not working
1. Check NPM logs
2. Verify domain DNS resolution
3. Ensure backend is running on port 3069
4. Check firewall: `sudo ufw status`

### SSL issues
1. Ensure domain resolves to correct IP
2. Wait for DNS propagation
3. Try HTTP first, then enable SSL

That's it! Your API is now accessible via Nginx Proxy Manager! 🎉