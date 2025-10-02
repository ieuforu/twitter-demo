import { IsString, IsNotEmpty } from 'class-validator';
import { UserResponseDto } from '../../users/dto/user.dto';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  content?: string;
}

export class PostResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  // 作者信息
  author: {
    id: number;
    username: string;
    name: string;
    avatar?: string;
  };

  // 统计数据
  likeCount: number;
  isLiked?: boolean;
}
