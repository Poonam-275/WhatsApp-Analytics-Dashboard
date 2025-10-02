import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity({ name: 'replies' })
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Message, { nullable: false })
  message!: Message;

  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column({ type: 'text' })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
