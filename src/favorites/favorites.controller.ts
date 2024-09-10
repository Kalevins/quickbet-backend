import { Controller, Post, Body, UseGuards, Request, Get, HttpStatus } from "@nestjs/common";
import type { Request as ExpressRequest } from "express";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { FavoritesService } from "./favorites.service";
import type { Favorite } from "./favorites.service";
import { FavoritesGuard } from "./favorites.guard";
import { AddDto } from "./dto/add.dto";

interface User {
  id: number;
  username: string;
}

interface UserRequest extends ExpressRequest {
  user: User;
}

@ApiBearerAuth()
@ApiTags("favorites")
@Controller("favorites")
export class FavoritesController {
  public constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(FavoritesGuard)
  @ApiOperation({ summary: "Add a favorite movie" })
  @ApiResponse({ status: HttpStatus.OK, description: "Favorite movie added" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Favorite movie already exists" })
  @Post("add")
  public addFavorite(@Request() req: UserRequest, @Body() addDto: AddDto): Promise<Favorite> {
    const userId = req.user.id;
    return this.favoritesService.addFavorite(userId, addDto.movieId);
  }

  @UseGuards(FavoritesGuard)
  @ApiOperation({ summary: "Get favorite movies" })
  @ApiResponse({ status: HttpStatus.OK, description: "Favorite movies found" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "No favorite movies found" })
  @Get("get")
  public getFavorites(@Request() req: UserRequest): Promise<number[]> {
    const userId = req.user.id;
    return this.favoritesService.getFavorites(userId);
  }
}
