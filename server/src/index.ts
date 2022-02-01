import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";

import {Request, Response} from "express";
import {Routes} from "./routes";
import {Users} from "./entity/Users";


createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(cookieParser());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(5000);

    // insert new users for test
    /*await connection.manager.save(connection.manager.create(Users, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));*/
    

    console.log("Express server has started on port 5000. Open http://localhost:5000/users to see results");

}).catch(error => console.log(error));
