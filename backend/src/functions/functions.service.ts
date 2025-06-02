import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionEntity } from './entities/function.entity';
import { SeatsService } from 'src/seats/seats.service';

@Injectable()
export class FunctionsService {

  constructor(
    @InjectRepository(FunctionEntity)
    private readonly functionRepository: Repository<FunctionEntity>,
    private readonly seatsService: SeatsService, 
  ) {}

  async create(createFunctionDto: CreateFunctionDto) {
    const newFunction = this.functionRepository.create(createFunctionDto);
    const savedFunction = await this.functionRepository.save(newFunction);

    await this.seatsService.generateSeatsForFunction(savedFunction.functionId);
    return savedFunction;
  }

  findAll() {
    return this.functionRepository.find({
      relations: [
        'movie', 
        'theater', 
        'seats', 
        'tickets'
      ],
    });
  }

  async findOne(id: string) {
    const func = await this.functionRepository.findOne({
      where: { functionId: id },
      relations: [
        'movie', 
        'theater', 
        'seats', 
        'tickets'
      ],
    });
    if (!func) {
      throw new Error(`Function with ID ${id} not found`);
    }
    return func;
  }

  async findByMovie(id: string) {
    return await this.functionRepository.find({
      where: { movieId: id },
      relations: [
        'movie', 
        'theater', 
        'seats', 
        'tickets'
      ],
    });
  }

  async update(id: string, updateFunctionDto: UpdateFunctionDto) {
    const funcToUpdate = await this.functionRepository.preload({
      functionId: id,
      ...updateFunctionDto,
    });
    if (!funcToUpdate) throw new NotFoundException(`Function with ID ${id} not found`);
    return await this.functionRepository.save(funcToUpdate);
  }

  async remove(id: string) {
    const func = await this.findOne(id);
    
    // remove seats associated with the function
    await this.seatsService.deleteSeatsForFunction(id);
    
    // remove the function itself
    await this.functionRepository.delete({ functionId: id });
    return {
      message: `Function with ID ${id} deleted`,
    };
  }
}
