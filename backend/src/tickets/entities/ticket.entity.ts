import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FunctionEntity } from 'src/functions/entities/function.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  ticketId: string;

  @ManyToOne(() => FunctionEntity, (func) => func.tickets, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'functionId' })
  function: FunctionEntity;

  @Column('uuid')
  functionId: string;

  @Column('text')
  userName: string;

  @Column('timestamp')
  purchaseDate: Date;

  @Column('jsonb')
  seats: { row_letter: string; seat_number: number }[];
}
