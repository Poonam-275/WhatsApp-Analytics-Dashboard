import { Controller, Get } from '@nestjs/common';
import { MessageStats, WhatsAppMessage } from '@whatsapp-analytics/shared';

@Controller('stats')
export class StatsController {
  @Get()
  getStats(): MessageStats {
    const sample: WhatsAppMessage[] = [
      { id: '1', from: 'userA', to: 'me', timestamp: new Date().toISOString(), type: 'text', status: 'delivered', content: 'Hello' },
      { id: '2', from: 'userB', to: 'me', timestamp: new Date().toISOString(), type: 'image', status: 'read' },
      { id: '3', from: 'me', to: 'userA', timestamp: new Date().toISOString(), type: 'text', status: 'sent', content: 'Hi' }
    ];

    const byType: MessageStats['byType'] = {
      text: 0,
      image: 0,
      audio: 0,
      video: 0,
      document: 0,
      sticker: 0,
      unknown: 0,
    };
    const byStatus: MessageStats['byStatus'] = {
      sent: 0,
      delivered: 0,
      read: 0,
      failed: 0,
    };

    for (const msg of sample) {
      byType[msg.type] += 1;
      if (msg.status) {
        byStatus[msg.status] += 1;
      }
    }

    const daily = [
      { date: new Date().toISOString().slice(0, 10), count: sample.length },
    ];

    return { total: sample.length, byType, byStatus, daily };
  }
}
