# Image Sharing API

Backend API cho website chia sẻ hình ảnh, xây dựng bằng NestJS.

## Công nghệ sử dụng

- NodeJS / NestJS
- Prisma ORM
- MySQL
- Cloudinary (upload ảnh)
- Multer
- JWT Authentication
- Swagger OpenAPI

## Chức năng

- Đăng ký / Đăng nhập
- Upload ảnh
- Xem danh sách ảnh
- Tìm kiếm ảnh theo tên
- Xem chi tiết ảnh + bình luận
- Lưu ảnh
- Quản lý ảnh cá nhân

## Tạo project

```bash
npm i -g @nestjs/cli
nest new image-sharing-api
```

## Cài đặt

```bash
npm install
npx prisma migrate dev
npm run start:dev

#Prisma + MySQL
npm install prisma @prisma/client
npx prisma init
npx prisma generate

#JWT Auth + Security
npm install @nestjs/jwt passport-jwt passport
npm install bcrypt
npm install -D @types/bcrypt

#Multer (Upload file)
npm install @nestjs/platform-express multer

#Cloudinary Upload
npm install cloudinary multer-storage-cloudinary

#Swagger API
npm install @nestjs/swagger swagger-ui-express
```

npm install class-validator class-transformer
