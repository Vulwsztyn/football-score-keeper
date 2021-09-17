import { UserController } from './controller/UserController'

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
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/users',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
  },
]
