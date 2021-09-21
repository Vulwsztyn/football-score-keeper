import 'reflect-metadata'
import { createConnection, getRepository } from 'typeorm'
import express from 'express'
import { Request, Response, Express, NextFunction } from 'express'
import { Routes } from './routes'
import cors from 'cors'
import { Team, Player, Game } from './entity'
import {
  TeamController,
  PlayerController,
  TeamAndPlayerController,
  GameController,
} from './controller'
import path from 'path'

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
  .then(async (connection) => {
    const repostiories = {
      PlayerRepository: getRepository(Player),
      TeamRepository: getRepository(Team),
      GameRepository: getRepository(Game),
    }

    const controllers = {
      PlayerController: new PlayerController(repostiories.PlayerRepository),
      TeamController: new TeamController(repostiories.TeamRepository),
      GameController: new GameController(repostiories.GameRepository),
      TeamAndPlayerController: new TeamAndPlayerController(connection.manager),
    }

    const app: Express = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(cors(options))
    app.use(express.json())

    Routes.forEach((route) => {
      app[route.method](
        route.route,
        (req: Request, res: Response, next: NextFunction) => {
          const controller = controllers[route.controller]
          const result = (controller as any)[route.action](req, res, next)
          if (result instanceof Promise) {
            result
              .then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined,
              )
              .catch((err) => {
                console.error(err)
                res.status(500).send(err)
              })
          } else if (result !== null && result !== undefined) {
            res.json(result)
          }
        },
      )
    })
    if(process.env.PRODUCTION) {
      app.use(express.static(path.join(__dirname, 'front')))
      app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'front', 'index.html'))
      })
    }
    app.listen(Number(process.env.PORT), '0.0.0.0')

    console.log(
      `SUCCESS! - Express server has started on port ${process.env.PORT}. Open http://localhost:${process.env.PORT}/players to see results`,
    )
  })
  .catch((error) => console.log(error))
