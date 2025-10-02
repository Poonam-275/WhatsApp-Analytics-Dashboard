export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  timestamp: string; // ISO
  type: 'text' | 'image' | 'audio' | 'video' | 'document' | 'sticker' | 'unknown';
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  content?: string;
}

export interface MessageStats {
  total: number;
  byType: Record<WhatsAppMessage['type'], number>;
  byStatus: Record<NonNullable<WhatsAppMessage['status']>, number>;
  daily: Array<{ date: string; count: number }>;
}
