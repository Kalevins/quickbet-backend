import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "../constants";
import { Users } from "../users/users.entity";
import { Favorites } from "../favorites/favorites.entity";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3600s" }, // 1 hour
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "100616010679",
      database: "test",
      entities: [Users, Favorites],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
