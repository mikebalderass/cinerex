import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async create({ functions = [], ...rest }: CreateMovieDto) {
    const movieToSave: any = {
      ...rest,
      functions: functions.map((id: string) => ({ id })),
    };

    this.movieRepository.save(movieToSave);
    return movieToSave;
  }

  findAll() {
    return this.movieRepository.find({
      relations: ["functions"],
    });
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne({
      where: { movieId: id },
      relations: ["functions"],
    });
    if (!movie) throw new NotFoundException("Movie not found");
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const { functions, ...rest } = updateMovieDto;
    const movieToUpdate: any = {
      movieId: id,
      ...rest,
      functions: functions?.map((id: string) => ({ id })),
    };

    const movieUpdated = await this.movieRepository.preload(movieToUpdate);
    if (!movieUpdated) {
      throw new NotFoundException("Movie not found");
    }

    return await this.movieRepository.save(movieUpdated);
  }

  remove(id: string) {
    const movie = this.movieRepository.findOne({ where: { movieId: id } });
    if (!movie) {
      throw new NotFoundException("Movie not found");
    }
    this.movieRepository.delete(id);
    return { message: `Movie ${id} deleted successfully` };
  }
}
