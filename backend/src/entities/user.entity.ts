import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { Message } from './message.entity';
import { Campaign } from './campaign.entity';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  VIEWER = 'VIEWER',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  name?: string | null;

  @Column()
  passwordHash!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', default: UserRole.USER })
  @Index()
  @IsEnum(UserRole)
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[];

  @OneToMany(() => Campaign, (campaign) => campaign.owner)
  campaigns!: Campaign[];
}
