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

    async searchImages(searchTerm: string) {
        try {
            const result = await cloudinary.search
                .expression(`resource_type:image AND public_id:*${searchTerm}*`)
                .sort_by('created_at', 'desc')
                .max_results(30)
                .execute();

            return result.resources?.map(img => ({
                publicId: img.public_id,
                url: img.secure_url,
                width: img.width,
                height: img.height,
                createdAt: img.created_at,
            })) || [];
        } catch (error) {
            console.error('Search error:', error);
            return [];
        }
    }

    async getImageById(imageId: number) {
        const image = await this.prisma.image.findUnique({
            where: { id: imageId },
            include: {
                user: {
                    select: { id: true, email: true, fullName: true }
                },
                _count: {
                    select: { comments: true, saved: true }
                }
            }
        });

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        return image;
    }

    async getImageByPublicId(publicId: string) {
        const image = await this.prisma.image.findFirst({
            where: {
                OR: [
                    { url: { contains: publicId } },
                    { title: publicId }
                ]
            },
            include: {
                user: {
                    select: { id: true, email: true, fullName: true }
                },
                _count: {
                    select: { comments: true, saved: true }
                }
            }
        });

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        return image;
    }

    async getImageComments(imageId: number) {
        if (!imageId || isNaN(imageId)) {
            throw new NotFoundException('Invalid image ID');
        }
        
        return this.prisma.comment.findMany({
            where: { imageId: Number(imageId) },
            include: {
                user: {
                    select: { id: true, email: true, fullName: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getImageCommentsByPublicId(publicId: string) {
        const image = await this.prisma.image.findFirst({
            where: {
                OR: [
                    { url: { contains: publicId } },
                    { title: publicId }
                ]
            }
        });

        if (!image) {
            return []; // Trả về mảng rỗng nếu không tìm thấy ảnh
        }

        return this.getImageComments(image.id);
    }

    async checkImageSaved(imageId: number, userId: number) {
        const saved = await this.prisma.savedImage.findFirst({
            where: {
                userId: userId,
                imageId: imageId
            }
        });

        return { isSaved: !!saved };
    }

    async addComment(imageId: number, userId: number, content: string) {
        // Kiểm tra ảnh có tồn tại không
        const image = await this.prisma.image.findUnique({
            where: { id: Number(imageId) }
        });

        if (!image) {
            throw new NotFoundException('Image not found');
        }

        return this.prisma.comment.create({
            data: {
                content,
                userId: Number(userId),
                imageId: Number(imageId)
            },
            include: {
                user: {
                    select: { id: true, email: true, fullName: true }
                }
            }
        });
    }

    async toggleSaveImage(imageId: number, userId: number) {
        const existingSave = await this.prisma.savedImage.findFirst({
            where: {
                userId: userId,
                imageId: imageId
            }
        });

        if (existingSave) {
            // Unsave
            await this.prisma.savedImage.delete({
                where: { id: existingSave.id }
            });
            return { isSaved: false, message: 'Đã bỏ lưu ảnh' };
        } else {
            // Save
            await this.prisma.savedImage.create({
                data: { userId, imageId }
            });
            return { isSaved: true, message: 'Đã lưu ảnh' };
        }
    }

    async toggleSaveImageByPublicId(publicId: string, userId: number) {
        try {
            // Tìm image record từ publicId
            let image = await this.prisma.image.findFirst({
                where: { 
                    OR: [
                        { url: { contains: publicId } },
                        { title: publicId }
                    ]
                }
            });

            if (!image) {
                // Tạo image record mới nếu chưa có
                const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/${publicId}`;
                
                image = await this.prisma.image.create({
                    data: {
                        title: publicId,
                        url: cloudinaryUrl,
                        userId: userId // Sử dụng userId của người dùng hiện tại
                    }
                });
            }

            return this.toggleSaveImage(image.id, userId);
        } catch (error) {
            console.error('Error in toggleSaveImageByPublicId:', error);
            throw error;
        }
    }

}
