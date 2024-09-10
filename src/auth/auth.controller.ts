import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Request as ExpressRequest } from "express";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signup.dto";

interface User {
  id: number;
  username: string;
}

interface ProfileRequest extends ExpressRequest {
  user: User;
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: HttpStatus.OK, description: "User logged in" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid credentials" })
  @Post("login")
  public login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "User registered" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User already exists" })
  @Post("register")
  public signUp(@Body() signUpDto: SignUpDto): Promise<{ access_token: string }> {
    return this.authService.singUp(signUpDto.username, signUpDto.password);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Logout" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "User logged out" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid token" })
  @Post("logout")
  public async logout(@Request() req: ExpressRequest): Promise<void> {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }
    const token = authorizationHeader.split(" ")[1] ?? "";
    return this.authService.logout(token);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Validate" })
  @ApiResponse({ status: HttpStatus.OK, description: "User validated" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid token" })
  @Get("validate")
  public validate(@Request() req: ProfileRequest): { user: User } {
    return { user: req.user as User };
  }
}
