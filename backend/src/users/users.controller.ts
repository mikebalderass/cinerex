import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
  ForbiddenException,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user-dto";
import { TOKEN_NAME } from "./constants/jwt.constants";
import { Response } from "express";
import { Cookies } from "./decorators/cookies.decorator";
import { AuthGuard } from "./guards/user.guard";
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Request } from "express";

// Extend Express Request interface to include 'user'
declare module "express" {
  interface Request {
    user?: any;
  }
}

@Controller("auth")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post("signup")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
    @Req() req: any
  ) {
    const currentUser = req.user;

    if (createUserDto.userRole?.includes("Admin")) {
      if (!currentUser?.userRole?.includes("Admin")) {
        throw new ForbiddenException(
          "Solo un Admin puede registrar a otro Admin."
        );
      }
    }

    const token = await this.usersService.registerUser(createUserDto);
    console.log("Token generated:", token);
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return;
  }

  @Post("login")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @Cookies() cookies: any
  ) {
    const token = await this.usersService.loginUser(
      loginUserDto.userName,
      loginUserDto.userPassword
    );
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return;
  }

  @Get("me")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obtener información del usuario autenticado" })
  @ApiResponse({ status: 200, description: "Usuario retornado exitosamente" })
  async getMe(@Req() req: Request) {
    const user = req.user as { sub: string };
    return this.usersService.getUserInfo(user.sub);
  }

  @Post("logout")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Cerrar sesión del usuario" })
  @ApiResponse({ status: 200, description: "Sesión cerrada exitosamente" })
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(TOKEN_NAME, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });

    return { message: "Sesión cerrada correctamente" };
  }
}
