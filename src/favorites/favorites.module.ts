import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FavoritesService } from "./favorites.service";
import { FavoritesController } from "./favorites.controller";
import { Favorites } from "./favorites.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Favorites])],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
