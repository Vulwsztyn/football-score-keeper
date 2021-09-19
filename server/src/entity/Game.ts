import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { TeamGame } from './TeamGame'

@Entity({ name: 'game' })
export class Game {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => TeamGame, (teamGame: TeamGame) => teamGame.game)
  teamGames: TeamGame[]
}
