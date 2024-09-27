import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "../constants";
import { Users } from "../users/users.entity";
import { Favorites } from "../favorites/favorites.entity";

ConfigModule.forRoot();

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
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || "3306", 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Users, Favorites],
      synchronize: true, // use this with development environment only
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
})
export class AppModule {}
