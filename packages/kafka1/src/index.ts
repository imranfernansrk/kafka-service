import express,{ Application} from 'express'
import dynamoose from 'dynamoose';
import {Route} from './routes'
import {producerInit} from './producer'
import {consumerInit} from './consumer'
import { KafkaService } from "@bambe/kafka";

class App{
    public app: Application
    public route
    constructor(){
        this.app = express()
        this.app.use(express.json())
        this.route = new Route()
        this.initialize()
    }

    private async initialize(){
        const kafkaService = new KafkaService();
        kafkaService.kafkaConsole();
        kafkaService.kafkaConfiguration();
        
        producerInit()
        consumerInit()
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