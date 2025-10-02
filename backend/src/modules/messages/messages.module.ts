import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../entities/message.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { BullModule } from '@nestjs/bull';
import { MessagesQueueProcessor } from './messages.queue';
import { WhatsAppMockService } from './whatsapp.mock';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), BullModule.registerQueue({ name: 'messages' })],
  providers: [MessagesService, MessagesQueueProcessor, WhatsAppMockService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
