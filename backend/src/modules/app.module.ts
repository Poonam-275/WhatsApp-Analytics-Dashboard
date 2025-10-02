import { Module } from '@nestjs/common';
import { HealthController } from '../routes/health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { JwtModule } from '@nestjs/jwt';
import { loadEnv } from '../config/env';
import { UsersModule } from '../modules/users/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { MessagesModule } from '../modules/messages/messages.module';
import { CampaignsModule } from '../modules/campaigns/campaigns.module';
import { AnalyticsModule } from '../modules/analytics/analytics.module';
import { WebsocketModule } from '../modules/websocket/websocket.module';
import { User } from '../entities/user.entity';
import { Message } from '../entities/message.entity';
import { Campaign } from '../entities/campaign.entity';
import { Reply } from '../entities/reply.entity';
import { Analytics } from '../entities/analytics.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../modules/auth/roles.guard';

const env = loadEnv();

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwtSecret,
      signOptions: { expiresIn: env.jwtExpiresIn },
      global: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.database.host,
      port: env.database.port,
      username: env.database.user,
      password: env.database.password,
      database: env.database.name,
      entities: [User, Message, Campaign, Reply, Analytics],
      synchronize: false,
      migrations: ['dist/database/migrations/*.js'],
      migrationsRun: false,
    }),
    BullModule.forRoot({
      redis: {
        host: env.redis.host,
        port: env.redis.port,
      },
    }),
    UsersModule,
    AuthModule,
    MessagesModule,
    CampaignsModule,
    AnalyticsModule,
    WebsocketModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
