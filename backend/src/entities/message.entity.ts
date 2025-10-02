import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Campaign } from './campaign.entity';

export type MessageType = 'text' | 'image' | 'audio' | 'video' | 'document' | 'sticker' | 'unknown';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column()
  externalId!: string; // ID from WhatsApp

  @ManyToOne(() => User, (user) => user.messages, { nullable: false })
  user!: User;

  @ManyToOne(() => Campaign, (campaign) => campaign.messages, { nullable: true })
  campaign?: Campaign | null;

  @Column()
  from!: string;

  @Column()
  to!: string;

  @Column({ type: 'timestamptz' })
  timestamp!: Date;

  @Column({ type: 'varchar' })
  type!: MessageType;

  @Column({ type: 'varchar', nullable: true })
  status?: MessageStatus;

  @Column({ type: 'text', nullable: true })
  content?: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}
