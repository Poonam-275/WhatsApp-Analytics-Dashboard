import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { WhatsAppMockService } from './whatsapp.mock';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Processor('messages')
export class MessagesQueueProcessor {
  constructor(
    @InjectRepository(Message) private readonly messagesRepo: Repository<Message>,
    private readonly mock: WhatsAppMockService,
    private readonly ws: WebsocketGateway,
  ) {}

  @Process('send')
  async handleSend(job: Job<{ to: string; content: string }>) {
    const sentAt = new Date();
    const sendRes = await this.mock.sendMessage(job.data.to, job.data.content);
    const msg = this.messagesRepo.create({
      externalId: sendRes.externalId,
      recipientPhone: job.data.to,
      content: job.data.content,
      type: 'text',
      status: 'sent',
      timestamp: sentAt,
      sentAt,
    });
    const saved = await this.messagesRepo.save(msg);
    this.ws.broadcast('message.sent', { id: saved.id, to: saved.recipientPhone });

    await this.mock.simulateDelivery();
    await this.messagesRepo.update(saved.id, { status: 'delivered', deliveredAt: new Date() });
    this.ws.broadcast('message.delivered', { id: saved.id });

    await this.mock.simulateRead();
    await this.messagesRepo.update(saved.id, { status: 'read', readAt: new Date() });
    this.ws.broadcast('message.read', { id: saved.id });

    const reply = this.mock.maybeGenerateReply(saved.content);
    if (reply) {
      await this.messagesRepo.update(saved.id, { status: 'replied', repliedAt: new Date() });
      this.ws.broadcast('message.replied', { id: saved.id, reply });
    }

    return { id: saved.id };
  }
}
