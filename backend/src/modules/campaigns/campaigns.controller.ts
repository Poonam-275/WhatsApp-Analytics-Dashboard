import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  async list() {
    return this.campaignsService.list();
  }

  @Post()
  @Roles('ADMIN', 'USER')
  async create(@Body() dto: CreateCampaignDto) {
    return this.campaignsService.createAndSchedule(dto);
  }
}
