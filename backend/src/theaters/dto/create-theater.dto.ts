import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  @IsNotEmpty()
  theaterNumber: string;
}
