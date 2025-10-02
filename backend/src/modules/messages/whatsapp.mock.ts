import { Injectable } from '@nestjs/common';

function wait(ms: number) { return new Promise((res) => setTimeout(res, ms)); }

@Injectable()
export class WhatsAppMockService {
  async sendMessage(to: string, content: string) {
    await wait(200 + Math.random() * 800);
    return { externalId: `wa_${Math.random().toString(36).slice(2, 10)}` };
  }

  async simulateDelivery() {
    await wait(200 + Math.random() * 1200);
  }

  async simulateRead() {
    await wait(200 + Math.random() * 1500);
  }

  maybeGenerateReply(content: string): string | null {
    const lc = content.toLowerCase();
    if (lc.includes('hello') || lc.includes('hi')) return 'Hello! How can I help?';
    if (lc.includes('price')) return 'Our price starts at $9.99/month.';
    if (Math.random() < 0.1) return 'Thanks!';
    return null;
  }
}
