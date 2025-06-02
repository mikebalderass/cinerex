import { Module } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { FunctionsController } from './functions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionEntity } from './entities/function.entity';
import { SeatsModule } from 'src/seats/seats.module';
import { MoviesModule } from 'src/movies/movies.module';
import { TheatersModule } from 'src/theaters/theaters.module';

@Module({
  imports: [TypeOrmModule.forFeature([FunctionEntity]), MoviesModule, TheatersModule, SeatsModule], 
  controllers: [FunctionsController],
  providers: [FunctionsService],
})
export class FunctionsModule {}
