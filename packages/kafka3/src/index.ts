import express,{ Application} from 'express'

import {consumerInit} from './cosumer'


class App{
    public app: Application
    constructor(){
        this.app = express()
        this.initialize()
    }

    private async initialize(){
        consumerInit()
    }

    public async listen(){
        await this.app.listen(5007, ()=>{
            console.log('Express server listening at 5007')
        })
    }

}


const expressApp = new App()
expressApp.listen()