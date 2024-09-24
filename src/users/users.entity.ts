import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  public userId!: number;

  @Column()
  public username!: string;

  @Column()
  public password!: string;

  @Column({ default: true })
  public active!: boolean;
}
