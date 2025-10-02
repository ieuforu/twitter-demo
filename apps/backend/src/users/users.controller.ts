import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PostsService } from '../posts/posts.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll(); // ✅ 正确
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('currentUserId') currentUserId?: string,
  ) {
    const userId = currentUserId ? parseInt(currentUserId) : undefined;
    return this.usersService.findOne(id, userId);
  }

  @Get(':id/posts')
  getUserPosts(
    @Param('id', ParseIntPipe) id: number,
    @Query('currentUserId') currentUserId?: string,
  ) {
    const userId = currentUserId ? parseInt(currentUserId) : undefined;
    return this.postsService.getUserPosts(id, userId);
  }

  @Post(':id/follow')
  followUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    return this.usersService.followUser(followerId, id);
  }

  @Delete(':id/follow')
  unfollowUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('followerId', ParseIntPipe) followerId: number,
  ) {
    return this.usersService.unfollowUser(followerId, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
