import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('messages')
export class MessagesQueueProcessor {
  @Process('send')
  async handleSend(job: Job<{ to: string; content: string }>) {
    // Integrate with WhatsApp API here
    return { delivered: true, to: job.data.to };
  }
}
