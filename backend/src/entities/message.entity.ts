import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { Campaign } from './campaign.entity';
import { IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export type MessageType = 'text' | 'image' | 'audio' | 'video' | 'document' | 'sticker' | 'unknown';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'replied' | 'failed';

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
  @IsPhoneNumber('ZZ')
  recipientPhone!: string;

  @Column({ type: 'timestamptz' })
  timestamp!: Date;

  @Column({ type: 'varchar' })
  type!: MessageType;

  @Column({ type: 'varchar' })
  @IsEnum(['sent', 'delivered', 'read', 'replied', 'failed'])
  status!: MessageStatus;

  @Column({ type: 'text' })
  @IsString()
  @Length(0, 4096)
  content!: string;

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  sentAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  deliveredAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  readAt?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  repliedAt?: Date | null;

  @CreateDateColumn()
  createdAt!: Date;
}
