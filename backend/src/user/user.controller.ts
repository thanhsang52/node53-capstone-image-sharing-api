import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';


@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Req() req) {
    return req.user;
  }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('saved-images')
    getSavedImages(@Req() req) {
        return this.userService.getSavedImages(req.user.userId);
    }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('my-images')
    getMyImages(@Req() req) {
        return this.userService.getImagesCreatedByUser(req.user.userId);
    }
}
