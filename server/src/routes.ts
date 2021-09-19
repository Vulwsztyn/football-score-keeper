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
]
