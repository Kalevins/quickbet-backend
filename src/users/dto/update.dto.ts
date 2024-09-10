export class UpdateDto {
  public userId: number;
  public username: string;
  public password: string;

  public constructor(userId: number, username: string, password: string) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }
}
