import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm'
import { TeamGame } from './TeamGame'

@Unique(['name'])
@Entity({ name: 'team' })
export class Team {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @OneToMany(() => TeamGame, (teamGame: TeamGame) => teamGame.team)
  teamGames: TeamGame[]
}
