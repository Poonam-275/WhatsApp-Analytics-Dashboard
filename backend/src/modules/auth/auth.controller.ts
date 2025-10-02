import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    const accessToken = await this.authService.signToken(user.id, user.email);
    const refreshToken = await this.authService.signRefreshToken(user.id, user.email);
    return { accessToken, refreshToken };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const accessToken = await this.authService.signToken(user.id, user.email);
    const refreshToken = await this.authService.signRefreshToken(user.id, user.email);
    return { accessToken, refreshToken };
  }

  @Post('refresh-token')
  async refresh(@Body() body: RefreshDto) {
    const payload = await this.authService.verifyRefreshToken(body.refreshToken);
    const accessToken = await this.authService.signToken(payload.sub, payload.email);
    const refreshToken = await this.authService.signRefreshToken(payload.sub, payload.email);
    return { accessToken, refreshToken };
  }

  @Post('logout')
  async logout() {
    return { success: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: any) {
    const user = await this.usersService.findById(req.user.userId);
    return { userId: req.user.userId, email: req.user.email, role: user?.role ?? 'USER' };
  }
}
