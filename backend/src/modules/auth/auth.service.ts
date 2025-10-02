import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    return this.usersService.validateUser(email, password);
  }

  async signToken(userId: string, email: string) {
    return this.jwtService.signAsync({ sub: userId, email });
  }

  async signRefreshToken(userId: string, email: string) {
    return this.jwtService.signAsync({ sub: userId, email, type: 'refresh' }, { expiresIn: '7d' });
  }

  async verifyRefreshToken(token: string): Promise<{ sub: string; email: string }> {
    const payload = await this.jwtService.verifyAsync<{ sub: string; email: string; type?: string }>(token);
    if (payload.type !== 'refresh') throw new Error('Invalid token type');
    return { sub: payload.sub, email: payload.email };
  }

  async register(dto: RegisterDto) {
    const role: UserRole = dto.role ?? UserRole.USER;
    return this.usersService.createUserWithRole({ email: dto.email, password: dto.password, name: dto.name, role });
  }
}
