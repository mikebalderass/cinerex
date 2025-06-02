import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ROLES } from 'src/users/constants/role.constants';

@ApiTags('Tickets')
@Controller('tickets')
@ApiBearerAuth()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Auth(ROLES.CUSTOMER, ROLES.ADMIN)
  @ApiOperation({
    summary: 'Crear un ticket',
    description: 'Permite al Administrador crear un nuevo ticket.',
  })
  @ApiResponse({
    status: 201,
    description: 'Ticket creado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear el ticket, datos inválidos o conflicto con datos existentes.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado, se requiere autenticación de administrador.',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido, el usuario no tiene permisos para crear tickets.',
  })
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Obtener todos los tickets',
    description: 'Devuelve una lista de todos los tickets disponibles en el sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tickets obtenida exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Se requiere autenticación.',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido. No tiene permisos para realizar esta acción.',
  })
  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Obtener un ticket por ID',
    description: 'Devuelve un ticket específico basado en su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket encontrado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Actualizar un ticket',
    description: 'Permite al Administrador actualizar los detalles de un ticket existente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket actualizado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al actualizar el ticket, datos inválidos o conflicto con datos existentes.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado, se requiere autenticación de administrador.',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido, el usuario no tiene permisos para actualizar tickets.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Eliminar un ticket',
    description: 'Permite al Administrador eliminar un ticket específico.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado, se requiere autenticación de administrador.',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido, el usuario no tiene permisos para eliminar tickets.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
