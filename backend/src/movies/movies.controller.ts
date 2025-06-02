import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import Multer from "multer";
import { UserData } from "src/users/decorators/user.decorator";
import { User } from "src/users/entities/user.entity";
import { Auth } from "src/users/decorators/auth.decorator";
import { ROLES } from "src/users/constants/role.constants";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { diskStorage } from "multer"; // Importa diskStorage
import { extname } from "path"; // Importa extname

@ApiTags("Movies")
@Controller("movies")
@ApiBearerAuth()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: "Crear una película",
    description: "Permite al Administrador crear una nueva película",
  })
  @ApiResponse({
    status: 201,
    description: "La película ha sido creada exitosamente",
  })
  @ApiResponse({
    status: 400,
    description:
      "Error al crear la película, datos inválidos o conflicto con datos existentes",
  })
  @ApiResponse({
    status: 401,
    description: "No autorizado, se requiere autenticación de administrador",
  })
  @ApiResponse({
    status: 403,
    description: "Prohibido, el usuario no tiene permisos para crear películas",
  })
  @Post()
  create(@UserData() user: User, @Body() createMovieDto: CreateMovieDto) {
    if (!user?.userRole?.includes("Admin")) {
      throw new UnauthorizedException(
        "No tienes permisos para crear una película"
      );
    }
    return this.moviesService.create(createMovieDto);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: "Subir un archivo de póster",
    description:
      "Permite al Administrador subir un archivo de póster para una película",
  })
  @ApiResponse({
    status: 201,
    description: "El archivo de póster ha sido subido exitosamente",
  })
  @ApiResponse({
    status: 400,
    description:
      "Error al subir el archivo, datos inválidos o conflicto con datos existentes",
  })
  @ApiResponse({
    status: 401,
    description: "No autorizado, se requiere autenticación de administrador",
  })
  @ApiResponse({
    status: 403,
    description:
      "Prohibido, el usuario no tiene permisos para subir archivos de póster",
  })
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("poster", {
      storage: diskStorage({
        destination: "./public/posters",
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}.jpg`); // Forzamos la extensión a .jpg
        },
      }),
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = `posters/${file.filename}`;
    const fullUrl = `http://127.0.0.1:3000/${filePath}`;

    return {
      message: "Archivo subido correctamente",
      path: filePath,
    };
  }

  @Auth(ROLES.ADMIN, ROLES.CUSTOMER)
  @ApiOperation({
    summary: "Consultar todas las películas",
    description: "Permite al Administrador y Cliente ver todas las películas",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de todas las películas",
  })
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Auth(ROLES.ADMIN, ROLES.CUSTOMER)
  @ApiOperation({
    summary: "Consultar una película por ID",
    description:
      "Permite al Administrador y Cliente ver los detalles de una película específica",
  })
  @ApiResponse({
    status: 200,
    description: "Detalles de la película solicitada",
  })
  @ApiResponse({
    status: 404,
    description: "Película no encontrada",
  })
  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.moviesService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: "Actualizar una película",
    description:
      "Permite al Administrador actualizar los detalles de una película existente",
  })
  @ApiResponse({
    status: 200,
    description: "La película ha sido actualizada exitosamente",
  })
  @ApiResponse({
    status: 400,
    description:
      "Error al actualizar la película, datos inválidos o conflicto con datos existentes",
  })
  @ApiResponse({
    status: 401,
    description: "No autorizado, se requiere autenticación de administrador",
  })
  @ApiResponse({
    status: 403,
    description:
      "Prohibido, el usuario no tiene permisos para actualizar películas",
  })
  @ApiResponse({
    status: 404,
    description: "Película no encontrada",
  })
  @Patch(":id")
  update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateMovieDto: UpdateMovieDto
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Auth(ROLES.ADMIN)
  @ApiOperation({
    summary: "Eliminar una película",
    description: "Permite al Administrador eliminar una película existente",
  })
  @ApiResponse({
    status: 200,
    description: "La película ha sido eliminada exitosamente",
  })
  @ApiResponse({
    status: 404,
    description: "Película no encontrada",
  })
  @ApiResponse({
    status: 401,
    description: "No autorizado, se requiere autenticación de administrador",
  })
  @ApiResponse({
    status: 403,
    description:
      "Prohibido, el usuario no tiene permisos para eliminar películas",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moviesService.remove(id);
  }
}