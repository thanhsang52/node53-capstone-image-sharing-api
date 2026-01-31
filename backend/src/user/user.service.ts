import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getSavedImages(userId: number) {
    return this.prisma.savedImage.findMany({
        where: { userId },
        include: {
        image: {
            include: {
            user: {
                select: { id: true, email: true },
            },
            },
        },
        },
    });
  }

  async getImagesCreatedByUser(userId: number) {
    return this.prisma.image.findMany({
        where: { userId },
    });
 }
}
