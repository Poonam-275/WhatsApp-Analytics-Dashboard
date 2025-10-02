import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index } from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

@Entity({ name: 'replies' })
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Message, { nullable: false })
  message!: Message;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column({ type: 'text' })
  @IsString()
  @Length(1, 4096)
  content!: string;

  @CreateDateColumn()
  @Index()
  receivedAt!: Date;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  @IsEnum(['positive', 'neutral', 'negative'])
  sentiment?: 'positive' | 'neutral' | 'negative' | null;
}
