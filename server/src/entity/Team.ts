import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Player } from '.'
import TeamGame from './TeamGame'

@Unique(['name'])
@Entity({ name: 'team' })
export default class Team {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @ManyToMany(() => Player, (player: Player) => player.id)
  @JoinTable({
    name: 'team_player',
    joinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'player_id',
      referencedColumnName: 'id',
    },
  })
  players: Player[]

  @OneToMany(() => TeamGame, (teamGame: TeamGame) => teamGame.team)
  teamGames: TeamGame[]
}
