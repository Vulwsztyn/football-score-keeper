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
}
