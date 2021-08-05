import { Application, Request, Response } from 'express'

import { send } from './producer'
export class Route {


    public routes(app: Application) {
        app.post('/publish', async (req: Request, res: Response) => {
            let response = await send(req.body)
            res.send(response)
        })
        app.get("/healthCheck", (_req, res) => {
            console.log('Inside the healthCheck')
            res.status(200).send({
                message: 'Tag service successfully UP'
            })
        });
    }



}



