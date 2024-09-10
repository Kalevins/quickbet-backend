import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "../constants";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3600s" }, // 1 hour
    }),
  ],
})
export class AppModule {}
