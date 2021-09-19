import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
import { Team } from './Team'
import { Game } from './Game'

@Entity({ name: 'team_game' })
export class TeamGame {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Team, (team) => team.teamGames)
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  public team: Team

  @ManyToOne(() => Game, (game) => game.teamGames)
  @JoinColumn({ name: 'game_id', referencedColumnName: 'id' })
  public game: Game

  @Column({ nullable: false })
  score: number
}
