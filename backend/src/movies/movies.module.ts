import { forwardRef, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { FunctionsModule } from 'src/functions/functions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), forwardRef(() => FunctionsModule)],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
