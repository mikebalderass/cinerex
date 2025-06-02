import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FunctionEntity } from 'src/functions/entities/function.entity';

export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD'
}

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  seatId: string;

  @ManyToOne(() => FunctionEntity, (func) => func.seats)
  @JoinColumn({ name: 'functionId' })
  function: FunctionEntity;

  @Column('uuid')
  functionId: string;

  @Column('char', { length: 1 })
  row_letter: string;

  @Column('int')
  seat_number: number;

  @Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.AVAILABLE })
  status: SeatStatus;
}
