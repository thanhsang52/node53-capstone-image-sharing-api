import { Injectable } from '@nestjs/common';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import cloudinary from '../config/cloudinary.config';

@Injectable()
export class ImageService {
    constructor(private prisma: PrismaService) {}

    async deleteImage(imageId: number, userId: number) {
        const image = await this.prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        if (image.userId !== userId) {
            throw new ForbiddenException('You cannot delete this image');
        }

        // Xóa ảnh đã lưu liên quan
        await this.prisma.savedImage.deleteMany({
            where: { imageId },
        });

        return this.prisma.image.delete({
            where: { id: imageId },
        });
    }
    async getAllImages() {
        const result = await cloudinary.search
            .expression('resource_type:image')
            .sort_by('created_at', 'desc')
            .max_results(30)
            .execute();

        return result.resources.map(img => ({
            publicId: img.public_id,
            url: img.secure_url,
            width: img.width,
            height: img.height,
            createdAt: img.created_at,
        }));
    }


}
