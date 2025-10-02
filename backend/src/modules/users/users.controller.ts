import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body.email, body.password);
  }

  @Get('seed-admin')
  async seedAdmin() {
    const email = 'admin@example.com';
    const password = 'admin123';
    const existing = await this.usersService.findByEmail(email);
    if (existing) return existing;
    return this.usersService.createUser(email, password);
  }
}
