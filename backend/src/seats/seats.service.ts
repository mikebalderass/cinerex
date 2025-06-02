import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat, SeatStatus } from './entities/seat.entity';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async generateSeatsForFunction(functionId: string) {
    const rows = 'ABCDEFGHIJ';
    const seats: Seat[] = [];

    for (const row of rows) {
      for (let num = 1; num <= 10; num++) {
        seats.push(this.seatRepository.create({
          functionId,
          row_letter: row,
          seat_number: num,
          status: SeatStatus.AVAILABLE,
        }));
      }
    }

    return this.seatRepository.save(seats);
  }

  async deleteSeatsForFunction(functionId: string) {
    await this.seatRepository.delete({ functionId });
  }

  async getSeatsByFunction(functionId: string) {
    return this.seatRepository.find({
      where: { functionId },
      order: { row_letter: 'ASC', seat_number: 'ASC' },
    });
  }

  async sellSeat(functionId: string, row: string, number: number) {
    const seat = await this.seatRepository.findOneBy({
      functionId,
      row_letter: row,
      seat_number: number,
    });

    if (!seat) throw new NotFoundException('Seat not found');
    if (seat.status !== SeatStatus.AVAILABLE)
      throw new BadRequestException('Seat is not available');

    seat.status = SeatStatus.SOLD;
    return this.seatRepository.save(seat);
  }

  async releaseSeat(functionId: string, row: string, number: number) {
    const seat = await this.seatRepository.findOneBy({
      functionId,
      row_letter: row,
      seat_number: number,
    });

    if (!seat) throw new NotFoundException('Seat not found');

    if (seat.status === SeatStatus.AVAILABLE) {
      return seat;
    }

    seat.status = SeatStatus.AVAILABLE;
    return this.seatRepository.save(seat);
  }
}
