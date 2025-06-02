import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theater } from './entities/theater.entity';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';

@Injectable()
export class TheatersService {
  
  constructor(
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  async create(createTheaterDto: CreateTheaterDto) {
    const newTheater = this.theaterRepository.create(createTheaterDto);
    return this.theaterRepository.save(newTheater);
  }

  findAll() {
    return this.theaterRepository.find({
      relations: ['functions'],
    });
  }

  async findOne(id: string) {
    const theater = await this.theaterRepository.findOne({
      where: { theaterId: id },
      relations: ['functions'],
    });
    if (!theater) throw new NotFoundException(`Theater with ID ${id} not found`);
    return theater;
  }

  async update(id: string, updateTheaterDto: UpdateTheaterDto) {
    const theater = await this.theaterRepository.preload({
      theaterId: id,
      ...updateTheaterDto,
    });
    if (!theater) throw new NotFoundException(`Theater with ID ${id} not found`);
    return this.theaterRepository.save(theater);
  }

  async remove(id: string) {
    const theater = await this.findOne(id);
    await this.theaterRepository.delete({ theaterId: id });
    return { message: `Theater with ID ${id} deleted` };
  }
}
