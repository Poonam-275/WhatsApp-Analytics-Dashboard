import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Message) private readonly messagesRepository: Repository<Message>,
  ) {}

  async totals() {
    const total = await this.messagesRepository.count();
    const delivered = await this.messagesRepository.count({ where: { status: 'delivered' } });
    const read = await this.messagesRepository.count({ where: { status: 'read' } });
    const replied = await this.messagesRepository.count({ where: { status: 'replied' } });
    const deliveryRate = total ? delivered / total : 0;
    const readRate = total ? read / total : 0;
    const replyRate = total ? replied / total : 0;
    return { total, delivered, read, replied, deliveryRate, readRate, replyRate };
  }

  async messagesTimeSeries(days = 14) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    const rows = await this.messagesRepository
      .createQueryBuilder('m')
      .select("to_char(date_trunc('day', m.timestamp), 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('m.timestamp BETWEEN :start AND :end', { start, end })
      .groupBy("date_trunc('day', m.timestamp)")
      .orderBy("date_trunc('day', m.timestamp)")
      .getRawMany<{ date: string; count: string }>();

    const map = new Map<string, number>();
    for (const r of rows) map.set(r.date, Number(r.count));
    const data: Array<{ date: string; count: number }> = [];
    const cur = new Date(start);
    while (cur <= end) {
      const key = cur.toISOString().slice(0, 10);
      data.push({ date: key, count: map.get(key) ?? 0 });
      cur.setDate(cur.getDate() + 1);
    }
    return data;
  }

  async campaignPerformance(campaignId: string) {
    const sent = await this.messagesRepository.count({ where: { campaign: { id: campaignId } as any } });
    const delivered = await this.messagesRepository.count({ where: { campaign: { id: campaignId } as any, status: 'delivered' } });
    const read = await this.messagesRepository.count({ where: { campaign: { id: campaignId } as any, status: 'read' } });
    const replied = await this.messagesRepository.count({ where: { campaign: { id: campaignId } as any, status: 'replied' } });
    return { sent, delivered, read, replied };
  }
}
