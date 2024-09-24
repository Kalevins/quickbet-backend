import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { DeleteResult } from "typeorm";

import { Users } from "./users.entity";

export interface User {
  userId: number;
  username: string;
  password: string;
  active: boolean;
}

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  public create(username: string, password: string): Promise<User> {
    return this.usersRepository.save({ username, password, active: true });
  }

  public findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  public findById(userId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ userId });
  }

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public async update(userId: number, username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ userId });
    if (!user) {
      return null;
    }
    user.username = username;
    user.password = password;
    return this.usersRepository.save(user);
  }

  public async delete(userId: number): Promise<DeleteResult> {
    return this.usersRepository.delete(userId);
  }
}
