import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete(':id')
    deleteImage(
    @Param('id') id: string,
    @Req() req
    ) {
    return this.imageService.deleteImage(+id, req.user.userId);
    }

    @Get()
    getImages() {
        return this.imageService.getAllImages();
    }
}
