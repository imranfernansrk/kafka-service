import express, { Application } from 'express'
import { KafkaService } from "@bambe/kafka";
import { ConsumerConfig, ConsumerSubscribeTopic, KafkaConfig } from 'kafkajs';

class App {
    public app: Application
    constructor() {
        this.app = express()
        this.consumerHealthCheck();
    }

    public consumerHealthCheck() {
        const kafkaConfig: KafkaConfig = { brokers: ["localhost:9092"] };
        const kafkaService = new KafkaService(kafkaConfig);

        const consumer: ConsumerConfig = { groupId: '' + Date.now() }
        kafkaService.consumerInit(consumer);

        const subscribe: ConsumerSubscribeTopic = { topic: 'CreateTopic1', fromBeginning: true };
        kafkaService.consumerSubscribe(subscribe);

        kafkaService.consumerRunMessage();
    }

    public async listen() {
        await this.app.listen(5005, () => {
            console.log('Express server listening at 5005')
        })
    }

}


const expressApp = new App()
expressApp.listen()