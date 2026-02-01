import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';

@ApiTags('Image')
@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}
    
    // GET /image
    @Get()
    getImages(@Query('search') search?: string) {
        if (search) {
            return this.imageService.searchImages(search);
        }
        return this.imageService.getAllImages();
    }

    // GET /image/:id
    @Get(':id')
    getImageById(@Param('id') id: string) {
        // Kiểm tra nếu là số thì dùng imageId, nếu không thì dùng publicId
        if (/^\d+$/.test(id)) {
            return this.imageService.getImageById(+id);
        } else {
            return this.imageService.getImageByPublicId(decodeURIComponent(id));
        }
    }

    // GET /image/:id/comments
    @Get(':id/comments')
    getImageComments(@Param('id') id: string) {
        // Kiểm tra nếu là số thì dùng imageId, nếu không thì dùng publicId
        if (/^\d+$/.test(id)) {
            return this.imageService.getImageComments(+id);
        } else {
            return this.imageService.getImageCommentsByPublicId(decodeURIComponent(id));
        }
    }

    // POST /image/:id/comments
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post(':id/comments')
    async addComment(
        @Param('id') id: string,
        @Body('content') content: string,
        @Req() req
    ) {
        // Kiểm tra nếu là số thì dùng imageId, nếu không thì tìm imageId từ publicId
        if (/^\d+$/.test(id)) {
            return this.imageService.addComment(+id, req.user.userId, content);
        } else {
            // Tìm hoặc tạo image từ publicId rồi lấy ID
            const publicId = decodeURIComponent(id);
            try {
                const image = await this.imageService.getImageByPublicId(publicId);
                return this.imageService.addComment(image.id, req.user.userId, content);
            } catch (error) {
                // Nếu không tìm thấy, tạo image record mới
                const newImage = await this.imageService.createImageFromPublicId(publicId, req.user.userId);
                return this.imageService.addComment(newImage.id, req.user.userId, content);
            }
        }
    }

    // POST /image/:id/save
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post(':id/save')
    toggleSaveImage(@Param('id') id: string, @Req() req) {
        // Kiểm tra nếu là số thì dùng imageId, nếu không thì dùng publicId
        if (/^\d+$/.test(id)) {
            return this.imageService.toggleSaveImage(+id, req.user.userId);
        } else {
            return this.imageService.toggleSaveImageByPublicId(decodeURIComponent(id), req.user.userId);
        }
    }

    // GET /image/:id/saved-status
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get(':id/saved-status')
    checkImageSaved(@Param('id') id: string, @Req() req) {
        return this.imageService.checkImageSaved(+id, req.user.userId);
    }

    // DELETE /image/:id
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteImage(
        @Param('id') id: string,
        @Req() req
    ) {
        return this.imageService.deleteImage(+id, req.user.userId);
    }
}
