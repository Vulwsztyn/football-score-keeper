import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import { Team } from './Team'

@Unique(['name'])
@Entity({ name: 'player' })
export class Player {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @ManyToMany(() => Team, (team: Team) => team.id)
  @JoinTable({
    name: 'team_player',
    joinColumn: {
      name: 'player_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  teams: Team[]
}
