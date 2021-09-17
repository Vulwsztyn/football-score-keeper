import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { Request, Response, Express, NextFunction } from 'express'
import { Routes } from './routes'
import cors from 'cors'

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
    // create express app
    const app: Express = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(cors(options))

    // register express routes from defined application routes
    Routes.forEach((route) => {
      app[route.method](
        route.route,
        (req: Request, res: Response, next: NextFunction) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next,
          )
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
