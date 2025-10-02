import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity({ name: 'campaigns' })
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => User, (user) => user.campaigns, { nullable: false })
  owner!: User;

  @Column({ default: 'draft' })
  status!: 'draft' | 'scheduled' | 'running' | 'completed' | 'failed';

  @Column({ type: 'timestamptz', nullable: true })
  scheduledAt?: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Message, (message) => message.campaign)
  messages!: Message[];
}
