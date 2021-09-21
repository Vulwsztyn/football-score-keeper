import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import TeamGame from './TeamGame'

@Entity({ name: 'game' })
export default class Game {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => TeamGame, (teamGame: TeamGame) => teamGame.game, {
    cascade: true,
  })
  teamGames: TeamGame[]
}
