import { Repository } from 'typeorm'
import { Request } from 'express'
import Player from '../entity/Player'

export default class PlayerController {
  private playerRepository: Repository<Player>

  constructor(playerRepository: Repository<Player>) {
    this.playerRepository = playerRepository
  }

  async all(): Promise<Player[]> {
    return this.playerRepository.find()
  }

  async one(request: Request): Promise<Player | undefined> {
    // return this.playerRepository.findOne(request.params.id)
    return this.playerRepository
      .createQueryBuilder('player')
      .leftJoinAndSelect('player.teams', 'team')
      .where('player.id = :id', { id: request.params.id })
      .getOne()
  }

  async save(request: Request): Promise<void> {
    return this.playerRepository.save(request.body)
  }
}
