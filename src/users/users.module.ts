import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { FavoritesModule } from "../favorites/favorites.module";
import { Users } from "./users.entity";

@Module({
  imports: [FavoritesModule, TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
