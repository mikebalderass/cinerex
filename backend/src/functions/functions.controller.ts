import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { FunctionsService } from "./functions.service";
import { CreateFunctionDto } from "./dto/create-function.dto";
import { UpdateFunctionDto } from "./dto/update-function.dto";
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Auth } from "src/users/decorators/auth.decorator";
import { ROLES } from "src/users/constants/role.constants";

@ApiTags("Functions")
@Controller("functions")
@ApiBearerAuth()
export class FunctionsController {
  constructor(private readonly functionsService: FunctionsService) {}

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: "Crear una función",
    description: "Permite al Administrador crear funciones",
  })
  @ApiResponse({
    status: 201,
    description: "La función ha sido creada exitosamente",
  })
  @ApiResponse({
    status: 400,
    description:
      "Error al crear la función, datos inválidos o conflicto con datos existentes",
  })
  @ApiResponse({
    status: 401,
    description: "No autorizado, se requiere autenticación de administrador",
  })
  @ApiResponse({
    status: 403,
    description: "Prohibido, el usuario no tiene permisos para crear funciones",
  })
  @Post()
  create(@Body() createFunctionDto: CreateFunctionDto) {
    return this.functionsService.create(createFunctionDto);
  }

  @Auth(ROLES.ADMIN, ROLES.CUSTOMER)
  @ApiOperation({
    summary: "Consultar todas las funciones",
    description: "Permite al Administrador y Cliente ver todas las funciones",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de todas las funciones",
  })
  @Get()
  findAll() {
    return this.functionsService.findAll();
  }

  @Auth(ROLES.ADMIN, ROLES.CUSTOMER)
  @ApiOperation({
    summary: "Consultar una funcion por id",
    description: "Permite al Administrador y Cliente ver una funcion",
  })
  @ApiResponse({
    status: 200,
    description: "Detalles de la función solicitada",
  })
  @ApiResponse({
    status: 404,
    description: "Función no encontrada",
  })
  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.functionsService.findOne(id);
  }

  @Auth(ROLES.ADMIN, ROLES.CUSTOMER)
  @ApiOperation({
    summary: "Consultar una funcion por pelicula",
    description:
      "Permite al Administrador y Cliente ver una funcion por pelicula",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de funciones para la película solicitada",
  })
  @Get("movie/:id")
  findByMovie(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.functionsService.findByMovie(id);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: "Actualizar una función",
    description:
      "Permite al Administrador actualizar la información de una función",
  })
  @Patch(":id")
  @ApiResponse({
    status: 200,
    description: "La función ha sido actualizada exitosamente",
  })
  @ApiResponse({
    status: 404,
    description: "Función no encontrada",
  })
  @ApiResponse({
    status:401,
    description: "No autorizado, se requiere autenticación de administrador",
  })
  @ApiResponse({
    status:403,
    description: "Prohibido, el usuario no tiene permisos para actualizar funciones",
  })
  update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateFunctionDto: UpdateFunctionDto
  ) {
    return this.functionsService.update(id, updateFunctionDto);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: "Eliminar una función",
    description: "Permite al Administrador eliminar una función",
  })
  @ApiResponse({
    status: 200,
    description: "La función ha sido eliminada exitosamente",
  })
  @ApiResponse({
    status: 404,
    description: "Función no encontrada",
  })
  @ApiResponse({
    status:401,
    description: "No autorizado, se requiere autenticación de administrador",
  })
  @ApiResponse({
    status:403,
    description: "Prohibido, el usuario no tiene permisos para eliminar funciones",
  })
  @Delete(":id")
  remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.functionsService.remove(id);
  }
}
