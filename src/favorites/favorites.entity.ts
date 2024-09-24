import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn()
  public favoriteId!: number;

  @Column()
  public userId!: number;

  @Column()
  public movieId!: number;
}
