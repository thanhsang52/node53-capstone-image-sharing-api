# 🚀 Node53 Capstone Image Sharing API

A complete image sharing platform built with NestJS, Prisma, MySQL, and Cloudinary integration.

## 🌟 Features

- **Authentication**: JWT-based user authentication
- **Image Management**: Upload, view, search images via Cloudinary
- **Social Features**: Save images, add comments
- **User Management**: Profile management, user-specific image collections
- **API Documentation**: Swagger/OpenAPI integration

## 🛠️ Tech Stack

- **Backend**: NestJS, TypeScript
- **Database**: MySQL with Prisma ORM
- **Image Storage**: Cloudinary
- **Authentication**: JWT
- **Documentation**: Swagger
- **Deployment**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js 18+
- MySQL 8.0+
- Cloudinary account
- Docker & Docker Compose (for deployment)

## 🚀 Quick Start

### Local Development

1. **Clone Repository**
```bash
git clone https://github.com/thanhsang52/node53-capstone-image-sharing-api.git
cd node53-capstone-image-sharing-api
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Database Setup**
```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

5. **Start Development Server**
```bash
npm run start:dev
```

6. **Access API**
- API: http://localhost:3000
- Documentation: http://localhost:3000/api

### Docker Deployment

1. **Clone & Configure**
```bash
git clone https://github.com/thanhsang52/node53-capstone-image-sharing-api.git
cd node53-capstone-image-sharing-api
cp .env.example .env
# Edit .env with production values
```

2. **Deploy**
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📚 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Images
- `GET /image` - Get all images (with search)
- `GET /image/:id` - Get image details
- `GET /image/:id/comments` - Get image comments
- `POST /image/:id/comments` - Add comment
- `POST /image/:id/save` - Save/unsave image
- `DELETE /image/:id` - Delete image

### User
- `GET /user/profile` - Get user profile
- `GET /user/saved-images` - Get saved images
- `GET /user/my-images` - Get created images

## 🔧 Environment Variables

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/database
DB_ROOT_PASSWORD=root_password
DB_NAME=capstone_image_api
DB_USER=capstone_user
DB_PASSWORD=db_password

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=3000
```

## 🐳 Docker Configuration

The project includes complete Docker setup:

- **docker-compose.yml**: Multi-service orchestration
- **Dockerfile**: Backend container configuration
- **deploy.sh**: Automated deployment script

### Services
- **Backend API**: NestJS application (Port 3069)
- **MySQL Database**: Data persistence (Port 3306)

## 📖 Database Schema

### Models
- **User**: User accounts and authentication
- **Image**: Image metadata and relationships
- **Comment**: User comments on images
- **SavedImage**: User's saved image collections

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation
- CORS configuration
- Environment variable protection

## 📊 Monitoring & Logs

```bash
# View container logs
docker-compose logs -f

# Monitor container status
docker-compose ps

# Check resource usage
docker stats
```

## 🚀 Production Deployment

1. **VPS Setup**
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose
```

2. **Deploy Application**
```bash
git clone https://github.com/thanhsang52/node53-capstone-image-sharing-api.git
cd node53-capstone-image-sharing-api
cp .env.example .env
# Configure production environment variables
./deploy.sh
```

3. **Access Application**
- API: http://your-domain:3069
- Documentation: http://your-domain:3069/api

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Thanh Sang**
- GitHub: [@thanhsang52](https://github.com/thanhsang52)

## 🆘 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/thanhsang52/node53-capstone-image-sharing-api/issues) page
2. Review container logs: `docker-compose logs`
3. Verify environment configuration
4. Ensure all services are running: `docker-compose ps`