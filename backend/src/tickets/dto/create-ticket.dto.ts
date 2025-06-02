import { IsUUID, IsString, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class SeatDto {
  @IsString()
  row_letter: string;

  @IsString()
  seat_number: number;
}

export class CreateTicketDto {
  @IsUUID()
  functionId: string;

  @IsString()
  userName: string;

  @IsDateString()
  purchaseDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}
