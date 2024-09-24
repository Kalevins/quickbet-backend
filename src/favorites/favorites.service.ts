/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorites } from "./favorites.entity";
import { Repository } from "typeorm";

export interface Favorite {
  movieId: number;
}

@Injectable()
export class FavoritesService {
  public constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
  ) {}

  public async addFavorite(userId: number, movieId: number): Promise<Favorites> {
    const favorite = await this.favoritesRepository.findOne({ where: { userId, movieId } });
    if (favorite) {
      await this.favoritesRepository.delete(favorite.favoriteId);
      return favorite;
    }
    return this.favoritesRepository.save({ userId, movieId });
  }

  public async getFavorites(userId: number): Promise<number[]> {
    const favorites = await this.favoritesRepository.find({ where: { userId } });
    return favorites.map((favorite) => favorite.movieId);
  }
}
