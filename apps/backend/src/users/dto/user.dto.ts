import { IsEmail, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;
}

export class UserResponseDto {
  id: number;
  email: string;
  username: string;
  name: string;
  bio?: string;
  website?: string;
  location?: string;
  phone?: string;
  company?: string;
  avatar?: string;
  createdAt: Date;

  // 统计数据
  postCount?: number;
  followerCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
}
