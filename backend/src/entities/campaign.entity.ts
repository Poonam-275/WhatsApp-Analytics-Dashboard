import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';
import { IsArray, IsDate, IsEnum, IsOptional, IsString, Length } from 'class-validator';

@Entity({ name: 'campaigns' })
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column()
  @IsString()
  @Length(1, 200)
  name!: string;

  @ManyToOne(() => User, (user) => user.campaigns, { nullable: false })
  owner!: User;

  @Column({ type: 'text' })
  @IsString()
  messageContent!: string;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  @IsArray()
  recipientList!: Array<{ phone: string; name?: string }>;

  @Column({ default: 'draft' })
  @IsEnum(['draft', 'scheduled', 'running', 'completed', 'failed'])
  status!: 'draft' | 'scheduled' | 'running' | 'completed' | 'failed';

  @Column({ type: 'timestamptz', nullable: true })
  @IsOptional()
  @IsDate()
  scheduledAt?: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Message, (message) => message.campaign)
  messages!: Message[];
}
