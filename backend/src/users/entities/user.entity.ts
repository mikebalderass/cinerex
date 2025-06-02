import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column('text')
  name: string;
  @Column('text', { unique: true })
  userName: string;
  @Column('text', { unique: true })
  userEmail: string;
  @Column('text')
  userPassword: string;
  @Column('simple-array', { default: 'Customer' })
  userRole: string[];
}
