import { Controller, Post, Param, Get, Body } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ROLES } from 'src/users/constants/role.constants';

@ApiTags("Seats")
@Controller('seats')
@ApiBearerAuth()
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Generar asientos para una función',
    description: 'Genera los asientos disponibles para una función específica.',
  })
  @ApiResponse({
    status: 201,
    description: 'Asientos generados exitosamente.'
  })
  @Post('generate/:functionId')
  generate(@Param('functionId') functionId: string) {
    return this.seatsService.generateSeatsForFunction(functionId);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Obtener asientos por función',
    description: 'Obtiene los asientos disponibles para una función específica.',
  })
  @ApiResponse({
    status: 200,
    description: 'Asientos obtenidos exitosamente.'
  })
  @ApiResponse({
    status: 404,
    description: 'Función no encontrada o no tiene asientos disponibles.'
  })
  @Get(':functionId')
  getSeats(@Param('functionId') functionId: string) {
    return this.seatsService.getSeatsByFunction(functionId);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Vender un asiento',
    description: 'Permite vender un asiento específico para una función.',
  })
  @ApiResponse({
    status: 200,
    description: 'Asiento vendido exitosamente.'
  })
  @ApiResponse({
    status: 404,
    description: 'Asiento no encontrado o ya vendido.'
  })
  @Post('sell')
  sell(@Body() body: { functionId: string; row: string; seatNumber: number }) {
    return this.seatsService.sellSeat(body.functionId, body.row, body.seatNumber);
  }
} 