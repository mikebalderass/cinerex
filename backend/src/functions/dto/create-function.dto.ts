import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsDateString } from 'class-validator';

export class CreateFunctionDto {
  @ApiProperty()
  @IsUUID()
  movieId: string;

  @ApiProperty()
  @IsUUID()
  theaterId: string;

  @ApiProperty()
  @IsDateString()
  datetime: string;

  // Creo falta declarar los tipos de las relaciones
}

