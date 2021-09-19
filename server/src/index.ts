import 'reflect-metadata'
import { createConnection, getRepository } from 'typeorm'
import express from 'express'
import { Request, Response, Express, NextFunction } from 'express'
import { Routes } from './routes'
import cors from 'cors'
import { Team, Player } from './entity'
import { TeamController, PlayerController } from './controller'

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:3000',
  preflightContinue: false,
}

createConnection()
  .then(async () => {
    const repostiories = {
      PlayerRepository: getRepository(Player),
      TeamRepository: getRepository(Team),
    }

    const controllers = {
      PlayerController: new PlayerController(repostiories.PlayerRepository),
      TeamController: new TeamController(repostiories.TeamRepository),
    }

    const app: Express = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(cors(options))

    Routes.forEach((route) => {
      app[route.method](
        route.route,
        (req: Request, res: Response, next: NextFunction) => {
          const controller = controllers[route.controller]
          const result = (controller as any)[route.action](req, res, next)
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined,
            )
          } else if (result !== null && result !== undefined) {
            res.json(result)
          }
        },
      )
    })

    app.listen(8000)

    console.log(
      'SUCCESS! - Express server has started on port 8000. Open http://localhost:8000/users to see results',
    )
  })
  .catch((error) => console.log(error))
