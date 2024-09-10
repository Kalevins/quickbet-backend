/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Injectable } from "@nestjs/common";

type Favorites = Record<string, number[]>;

export interface Favorite {
  movieId: number;
}

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {}; // In-memory storage for simplicity

  public addFavorite(userId: number, movieId: number): Promise<Favorite> {
    const userKey = userId.toString();

    if (!this.favorites[userKey]) {
      this.favorites[userKey] = [];
    }

    const index = this.favorites[userKey].indexOf(movieId);

    if (index === -1) {
      this.favorites[userKey].push(movieId);
    } else {
      this.favorites[userKey].splice(index, 1);
    }

    return Promise.resolve({ movieId });
  }

  public getFavorites(userId: number): Promise<number[]> {
    const userKey = userId.toString();
    const favorites = this.favorites[userKey] || [];
    return Promise.resolve(favorites);
  }
}
