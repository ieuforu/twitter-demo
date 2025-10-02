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
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Body('authorId', ParseIntPipe) authorId: number,
  ) {
    return this.postsService.create(createPostDto, authorId);
  }

  @Get()
  findAll(@Query('currentUserId') currentUserId?: string) {
    const userId = currentUserId ? parseInt(currentUserId) : undefined;
    return this.postsService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('currentUserId') currentUserId?: string,
  ) {
    const userId = currentUserId ? parseInt(currentUserId) : undefined;
    return this.postsService.findOne(id, userId);
  }

  @Post(':id/like')
  likePost(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.likePost(id, userId);
  }

  @Delete(':id/like')
  unlikePost(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.unlikePost(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Body('currentUserId', ParseIntPipe) currentUserId: number,
  ) {
    return this.postsService.update(id, updatePostDto, currentUserId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Body('currentUserId', ParseIntPipe) currentUserId: number,
  ) {
    return this.postsService.remove(id, currentUserId);
  }
}
