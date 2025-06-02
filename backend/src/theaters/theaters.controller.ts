import {
  Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe
} from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ROLES } from 'src/users/constants/role.constants';

@ApiTags('Theaters')
@Controller('theaters')
@ApiBearerAuth()
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Crear una funcion',
    description: 'Permite crear un nueva funcion.',
  })
  @ApiResponse({
    status: 201,
    description: 'Funcion creada exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear funcion. Verifique los datos proporcionados.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Se requiere autenticación de administrador.',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido. No tiene permisos para realizar esta acción.',
  })
  @Post()
  create(@Body() createTheaterDto: CreateTheaterDto) {
    return this.theatersService.create(createTheaterDto);
  }

  @Auth(ROLES.ADMIN, ROLES.CUSTOMER)
  @ApiOperation({
    summary: 'Obtener todos las funciones',
    description: 'Devuelve una lista de todas las funciones disponibles en el sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de funciones obtenida exitosamente.',
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
    return this.theatersService.findAll();
  }

  @Auth(ROLES.ADMIN, ROLES.CUSTOMER)
  @ApiOperation({
    summary: 'Obtener una funcion por ID',
    description: 'Devuelve los detalles de una función específica por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Función obtenida exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Función no encontrada. Verifique el ID proporcionado.',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.theatersService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Actualizar una funcion',
    description: 'Permite actualizar los detalles de una función existente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Función actualizada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Función no encontrada. Verifique el ID proporcionado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al actualizar la función. Verifique los datos proporcionados.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Se requiere autenticación de administrador.',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido. No tiene permisos para realizar esta acción.',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTheaterDto: UpdateTheaterDto,
  ) {
    return this.theatersService.update(id, updateTheaterDto);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: 'Eliminar una funcion',
    description: 'Permite eliminar una función específica por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Función eliminada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Función no encontrada. Verifique el ID proporcionado.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Se requiere autenticación de administrador.',
  })
  @ApiResponse({
    status: 403,
    description: 'Prohibido. No tiene permisos para realizar esta acción.',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.theatersService.remove(id);
  }
}
