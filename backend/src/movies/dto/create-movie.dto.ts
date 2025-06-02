import { ApiProperty } from "@nestjs/swagger";
import {IsArray, IsInt, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";


export class CreateMovieDto {
  @ApiProperty()
  @IsUUID("4")
  @IsOptional()
  movieId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  description: string;

  @ApiProperty()
  @IsInt()
  duration: number;

  @ApiProperty()
  @IsString()
  rating: string;

  @ApiProperty()
  @IsOptional()
  poster: string;

  @ApiProperty({
    type: [String],
    description: "Array of function IDs associated with the movie",
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  functions: string[]; 
}
