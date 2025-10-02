import { Module } from '@nestjs/common';
import { HealthController } from '../routes/health.controller';
import { StatsController } from '../routes/stats.controller';

@Module({
  imports: [],
  controllers: [HealthController, StatsController],
  providers: [],
})
export class AppModule {}
