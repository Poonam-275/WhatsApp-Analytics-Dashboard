import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Message) private readonly messagesRepository: Repository<Message>,
  ) {}

  async totals() {
    const total = await this.messagesRepository.count();
    return { total };
  }
}
