import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FunctionEntity } from 'src/functions/entities/function.entity';

@Entity('theaters')
export class Theater {
  @PrimaryGeneratedColumn('uuid')
  theaterId: string;

  @Column('text', { unique: true })
  theaterNumber: string;

  @OneToMany(() => FunctionEntity, (func) => func.theater)
  functions: FunctionEntity[];
}
