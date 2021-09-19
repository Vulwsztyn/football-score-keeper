import { PlayerController } from './controller/PlayerController'
import { TeamController } from './controller/TeamController'

interface IRoute {
  method: 'get' | 'post' | 'put' | 'delete'
  route: string
  controller: {
    new (): any
  }
  action: string
}

export const Routes: IRoute[] = [
  {
    method: 'get',
    route: '/players',
    controller: PlayerController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/players/:id',
    controller: PlayerController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/players',
    controller: PlayerController,
    action: 'save',
  },
  {
    method: 'get',
    route: '/teams',
    controller: TeamController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/teams/:id',
    controller: TeamController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/teams',
    controller: TeamController,
    action: 'save',
  },
]
