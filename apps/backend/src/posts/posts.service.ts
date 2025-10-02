import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto, PostResponseDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPostDto: CreatePostDto,
    authorId: number,
  ): Promise<PostResponseDto> {
    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return this.formatPostResponse(post);
  }

  async findAll(currentUserId?: number): Promise<PostResponseDto[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: currentUserId
          ? {
              where: {
                userId: currentUserId,
              },
              select: {
                id: true,
              },
            }
          : false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map((post) => this.formatPostResponse(post, currentUserId));
  }

  async findOne(id: number, currentUserId?: number): Promise<PostResponseDto> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: currentUserId
          ? {
              where: {
                userId: currentUserId,
              },
              select: {
                id: true,
              },
            }
          : false,
      },
    });

    if (!post) {
      throw new NotFoundException('帖子不存在');
    }

    return this.formatPostResponse(post, currentUserId);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    currentUserId: number,
  ): Promise<PostResponseDto> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('帖子不存在');
    }

    if (post.authorId !== currentUserId) {
      throw new ForbiddenException('只能编辑自己的帖子');
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return this.formatPostResponse(updatedPost);
  }

  async remove(id: number, currentUserId: number): Promise<void> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('帖子不存在');
    }

    if (post.authorId !== currentUserId) {
      throw new ForbiddenException('只能删除自己的帖子');
    }

    await this.prisma.post.delete({
      where: { id },
    });
  }

  async likePost(postId: number, userId: number): Promise<void> {
    await this.prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  async unlikePost(postId: number, userId: number): Promise<void> {
    await this.prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }

  async getUserPosts(
    userId: number,
    currentUserId?: number,
  ): Promise<PostResponseDto[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: currentUserId
          ? {
              where: {
                userId: currentUserId,
              },
              select: {
                id: true,
              },
            }
          : false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map((post) => this.formatPostResponse(post, currentUserId));
  }

  private formatPostResponse(
    post: any,
    currentUserId?: number,
  ): PostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      likeCount: post._count?.likes || 0,
      isLiked: currentUserId ? post.likes?.length > 0 : undefined,
    };
  }
}
