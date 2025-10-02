import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity({ name: 'analytics' })
export class Analytics {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'timestamptz' })
  periodStart!: Date;

  @Index()
  @Column({ type: 'timestamptz' })
  periodEnd!: Date;

  @Column({ type: 'varchar' })
  @IsString()
  granularity!: 'hour' | 'day' | 'week';

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  campaignId?: string | null;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  messagesSent!: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  messagesDelivered!: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  messagesRead!: number;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  repliesReceived!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
