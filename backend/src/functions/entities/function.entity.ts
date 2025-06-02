import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { Theater } from 'src/theaters/entities/theater.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Entity('functions')
export class FunctionEntity {
  @PrimaryGeneratedColumn('uuid')
  functionId: string;

  @ManyToOne(() => Movie, (movie) => movie.functions, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column('uuid')
  movieId: string;

  @ManyToOne(() => Theater, (theater) => theater.functions, { eager: true })
  @JoinColumn({ name: 'theaterId' })
  theater: Theater;

  @Column('uuid')
  theaterId: string;

  @Column('timestamp')
  datetime: Date;

  @OneToMany(() => Seat, (seat) => seat.function)
  seats: Seat[];

  @OneToMany(() => Ticket, (ticket) => ticket.function)
  tickets: Ticket[];
}
