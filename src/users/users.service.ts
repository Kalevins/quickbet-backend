import { Injectable } from "@nestjs/common";

export interface User {
  userId: number;
  username: string;
  password: string;
  active: boolean;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: "admin@admin.com",
      password: "admin1234",
      active: true,
    },
    {
      userId: 2,
      username: "kevin@email.com",
      password: "test1234",
      active: true,
    },
  ];

  public create(username: string, password: string): Promise<User> {
    const user: User = {
      userId: this.users.length + 1,
      username,
      password,
      active: true,
    };
    this.users.push(user);
    return Promise.resolve(user);
  }

  public findByUsername(username: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username);
    return Promise.resolve(user);
  }

  public findById(userId: number): Promise<User | undefined> {
    const user = this.users.find((user) => user.userId === userId);
    return Promise.resolve(user);
  }

  public findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  public async update(
    userId: number,
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      return undefined;
    }
    user.username = username;
    user.password = password;
    return Promise.resolve(user);
  }

  public async delete(userId: number): Promise<User | undefined> {
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      return undefined;
    }
    user.active = false;
    return Promise.resolve(user);
  }
}
