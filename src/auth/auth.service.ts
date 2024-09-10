import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  private readonly tokenBlacklist = new Set<string>(); // In-memory token blacklist

  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async singUp(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      throw new UnauthorizedException();
    }
    const newUser = await this.usersService.create(username, password);
    const payload = { id: newUser.userId, username: newUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async logout(token: string): Promise<void> {
    this.tokenBlacklist.add(token);
    return Promise.resolve();
  }

  public isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.has(token);
  }
}
