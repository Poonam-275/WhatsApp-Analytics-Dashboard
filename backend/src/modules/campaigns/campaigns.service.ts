import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../../entities/campaign.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign) private readonly campaignsRepository: Repository<Campaign>,
    @InjectQueue('messages') private readonly messagesQueue: Queue,
  ) {}

  async list() {
    return this.campaignsRepository.find();
  }

  async createAndSchedule(dto: CreateCampaignDto) {
    const campaign = this.campaignsRepository.create({
      name: dto.name,
      messageContent: dto.messageContent,
      recipientList: dto.recipientList,
      status: dto.scheduledAt ? 'scheduled' : 'running',
      scheduledAt: dto.scheduledAt ?? null,
    });
    const saved = await this.campaignsRepository.save(campaign);

    const rateMs = 200; // basic rate limiting interval
    let delay = 0;
    for (const r of dto.recipientList) {
      await this.messagesQueue.add('send', { to: r.phone, content: dto.messageContent }, { delay });
      delay += rateMs;
    }

    return saved;
  }
}
