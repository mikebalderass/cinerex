import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SeatsService } from 'src/seats/seats.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,

    private readonly seatsService: SeatsService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { functionId, seats } = createTicketDto;

    for (const seatInfo of seats) {
      await this.seatsService.sellSeat(functionId, seatInfo.row_letter, seatInfo.seat_number);
    }


    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      purchaseDate: new Date(createTicketDto.purchaseDate),
    });

    return await this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      relations: ['function'],
    });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where: { ticketId: id }, relations: ['function'] });
    if (!ticket) throw new NotFoundException(`Ticket ${id} not found`);
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.preload({
      ticketId: id,
      ...updateTicketDto,
    });
    if (!ticket) throw new NotFoundException(`Ticket ${id} not found`);
    return await this.ticketRepository.save(ticket);
  }

  async remove(id: string): Promise<void> {
    const ticket = await this.findOne(id);

    const { seats, functionId } = ticket;
    if (seats && seats.length > 0) {
      for (const seatInfo of seats) {
        await this.seatsService.releaseSeat(functionId, seatInfo.row_letter, seatInfo.seat_number);
      }
    }

    await this.ticketRepository.remove(ticket);
  }
}
