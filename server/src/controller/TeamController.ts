import { getRepository } from 'typeorm'
import { Request } from 'express'
import { Team } from '../entity/Team'

export class TeamController {
  private teamRepository = getRepository(Team)

  async all(): Promise<Team[]> {
    return this.teamRepository.find()
  }

  async one(request: Request): Promise<Team | undefined> {
    return this.teamRepository.findOne(request.params.id)
  }

  async save(request: Request): Promise<void> {
    return this.teamRepository.save(request.body)
  }

  createAllGamesQuery(): any {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.teamGames', 'teamGame')
      .leftJoinAndSelect('teamGame.game', 'game')
      .leftJoinAndSelect('game.teamGames', 'teamGames')
      .leftJoinAndSelect('teamGames.team', 'opposingTeam')
  }

  mapGamesForOne({ name, teamGames }: any): any {
    return {
      name,
      teamGames: teamGames.map(
        ({ score, game }: { score: number; game: any }) => ({
          score,
          opposingScore: game.teamGames[0].team.name,
          opposingTeam: game.teamGames[0].score,
        }),
      ),
    }
  }

  async gamesForOne(request: Request): Promise<any | undefined> {
    const query = this.createAllGamesQuery().where(
      'team.id = :id AND teamGames.game_id = game.id AND teamGames.team_id != team.id',
      { id: request.params.id },
    )
    return this.mapGamesForOne(await query.getOne())
  }
}
