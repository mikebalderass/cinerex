import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FunctionEntity } from 'src/functions/entities/function.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  movieId: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  duration: number;

  @Column('text')
  rating: string;

  @Column('text', { nullable: true })
  poster: string;

  @OneToMany(() => FunctionEntity, (func) => func.movie)
  functions: FunctionEntity[];
}
