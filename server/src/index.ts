import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'

import { Request, Response } from 'express'
import { Routes } from './routes'

createConnection()
    .then(async (connection) => {
        const app = express()
        app.use(bodyParser.json())
        app.use(
            cors({
                credentials: true,
                origin: '*',
            })
        )

        app.use(cookieParser())

        // register express routes from defined application routes

        Routes.forEach((route) => {
            //эта функция автоматически создана при инициализации проекта typeORM
            ;(app as any)[route.method](
                route.route,
                (req: Request, res: Response, next: Function) => {
                    const result = new (route.controller as any)()[
                        route.action
                    ](req, res, next)
                    if (result instanceof Promise) {
                        result.then((result) =>
                            result !== null && result !== undefined
                                ? res.send(result)
                                : undefined
                        )
                    } else if (result !== null && result !== undefined) {
                        res.json(result)
                    }
                }
            )
        })

        app.listen(process.env.PORT)

        console.log('Express server has started on port 5000')
    })
    .catch((error) => console.log(error))
