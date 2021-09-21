import { Repository } from 'typeorm'
import { Request } from 'express'
import Game from '../entity/Game'

export default class GameController {
  private gameRepository: Repository<Game>

  constructor(gameRepository: Repository<Game>) {
    this.gameRepository = gameRepository
  }

  async save(request: Request): Promise<Game | any> {
    console.log(request.body)
    const Game = this.gameRepository.create({
      teamGames: request.body.teamGames,
    })
    console.log(Game)
    return await this.gameRepository.save(Game)
  }
}
