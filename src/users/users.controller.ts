import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UsersGuard } from "./users.guard";
import { UsersService } from "./users.service";
import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";

interface User {
  userId: number;
  username: string;
}

@ApiBearerAuth()
@ApiTags("users")
@Controller("users")
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: "Create a user" })
  @ApiResponse({ status: HttpStatus.OK, description: "User created" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User already exists" })
  @Post("create")
  public create(@Body() createDto: CreateDto): Promise<User> {
    return this.usersService.create(createDto.username, createDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: "Find a user by ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "User found" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Post("findById")
  public findById(@Body() userId: number): Promise<User | undefined> {
    return this.usersService.findById(userId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: "Find all users" })
  @ApiResponse({ status: HttpStatus.OK, description: "Users found" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "No users found" })
  @Get("findAll")
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: HttpStatus.OK, description: "User updated" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Post("update")
  public update(@Body() updateDto: UpdateDto): Promise<User | undefined> {
    return this.usersService.update(updateDto.userId, updateDto.username, updateDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UsersGuard)
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: HttpStatus.OK, description: "User deleted" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "User not found" })
  @Get("delete")
  public delete(@Body() userId: number): Promise<User | undefined> {
    return this.usersService.delete(userId);
  }
}
