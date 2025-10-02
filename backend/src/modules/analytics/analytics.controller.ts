import { Controller, Get, UseGuards, Param, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('totals')
  async totals() {
    return this.analyticsService.totals();
  }

  @Get('overview')
  async overview(@Query('days') days?: string) {
    const series = await this.analyticsService.messagesTimeSeries(days ? Number(days) : 14);
    const totals = await this.analyticsService.totals();
    return { series, totals };
  }

  @Get('campaigns/:id')
  async campaign(@Param('id') id: string) {
    return this.analyticsService.campaignPerformance(id);
  }
}
