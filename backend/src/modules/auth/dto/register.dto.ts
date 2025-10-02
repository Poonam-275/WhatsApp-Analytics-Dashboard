import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from '../../../entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(8, 128)
  password!: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
