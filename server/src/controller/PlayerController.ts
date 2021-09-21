import { Repository } from 'typeorm'
import { Request } from 'express'
import Player from '../entity/Player'
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from '../constants'

export default class PlayerController {
  private playerRepository: Repository<Player>

  constructor(playerRepository: Repository<Player>) {
    this.playerRepository = playerRepository
  }

  async all(): Promise<Player[]> {
    return this.playerRepository.find()
  }

  async one(request: Request): Promise<Player | undefined> {
    return this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.teams', 'team')
      .where('player.id = :id', { id: request.params.id })
      .getOne()
  }

  async save(request: Request): Promise<Player | any> {
    try {
      return await this.playerRepository.save(request.body)
    } catch (err) {
      console.log(PG_UNIQUE_CONSTRAINT_VIOLATION)
      if (err && (err as any).code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        return {
          error: {
            error: err,
            msg: 'Player with such name already exists',
          },
        }
      } else {
        throw err
      }
    }
  }

  createAllGamesQuery(): any {
    return this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.teams', 'team')
      .leftJoinAndSelect('team.teamGames', 'teamGame')
      .leftJoinAndSelect('teamGame.game', 'game')
      .leftJoinAndSelect('game.teamGames', 'teamGames')
      .leftJoinAndSelect('teamGames.team', 'opposingTeam')
  }

  static mapGamesForOne({ name, teams }: { name: string; teams: any[] }): any {
    return {
      name,
      teams: teams.map(({ name, teamGames }) => ({
        name,
        teamGames: teamGames.map(
          ({ score, game }: { score: number; game: any }) => ({
            score,
            opposingTeam: game.teamGames[0].team.name,
            opposingScore: game.teamGames[0].score,
          }),
        ),
      })),
    }
  }

  async gamesForOne(request: Request): Promise<any | undefined> {
    const query = this.createAllGamesQuery().where(
      'player.id = :id AND teamGames.game_id = game.id AND teamGames.team_id != team.id',
      { id: request.params.id },
    )
    return PlayerController.mapGamesForOne(await query.getOne())
  }
}
