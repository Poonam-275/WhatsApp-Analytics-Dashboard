import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly messagesRepository: Repository<Message>,
  ) {}

  async countByStatus() {
    const qb = this.messagesRepository.createQueryBuilder('m');
    const rows = await qb
      .select('m.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('m.status')
      .getRawMany<{ status: string; count: string }>();
    return rows.reduce<Record<string, number>>((acc, r) => {
      acc[r.status || 'unknown'] = Number(r.count);
      return acc;
    }, {});
  }
}
