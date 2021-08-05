import express,{ Application} from 'express'
import {Route} from './routes'
import { createSubscription } from "./ConsumerSubscribe";
// import {producerInit} from './producer'

class App{
    public app: Application
    public route
    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.route = new Route()
        createSubscription();
        this.initialize()
    }
    private async initialize(){
        // producerInit()
        this.route.routes(this.app)
    }

    public async listen(){
        await this.app.listen(5004, ()=>{
            console.log('Express server listening at 5004')
        })
    }

}


const expressApp = new App()
expressApp.listen()