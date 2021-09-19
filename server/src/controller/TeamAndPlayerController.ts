import { EntityManager } from 'typeorm'

interface SummaryItem {
  id: number
  name: string
  gf: string
  ga: string
  gd: string
  wins: string
  losses: string
  games_played: string
  win_ratio: string
  is_team: boolean
}

export default class TeamAndPlayerController {
  private entityManager: EntityManager

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager
  }

  async all(): Promise<SummaryItem[]> {
    return this.entityManager.query(
      `
        with intermediate_result as (
            with teams_and_players as (
                select id, name, tp.team_id as team_id, false as is_team
                from player
                        left join team_player tp on player.id = tp.player_id
                union all
                select id, name, id as team_id, true as is_team
                from team
            )
            select tap.id,
                name,
                is_team,
                sum(tg1.score)                                         as gf,
                sum(tg2.score)                                         as ga,
                sum(case when tg1.score > tg2.score then 1 else 0 end) as wins,
                sum(case when tg1.score < tg2.score then 1 else 0 end) as losses,
                count(*)                                               as games_played
            from teams_and_players tap
                    left join team_game tg1 on tg1.team_id = tap.team_id
                    left join team_game tg2 on tg2.game_id = tg1.game_id and tg2.team_id != tg1.team_id
            group by tap.id, tap.name, tap.is_team
        )
        select *, round(wins::decimal / games_played, 2) as win_ratio, gf - ga as gd
        from intermediate_result
        order by win_ratio desc, gd desc
        `,
    )
  }
}
