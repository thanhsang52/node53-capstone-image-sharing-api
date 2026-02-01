# Backend API Dockerfile
FROM node:20

WORKDIR /app

# Copy package files from backend directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code from backend directory
COPY backend/ .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start script with migration
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]