// import { Kafka, Producer } from 'kafkajs'
import { KafkaService } from "@bambe/kafka";
import { KafkaConfig, ProducerRecord } from "kafkajs";
import * as winston from 'winston'

//proile dao place
const kafkaConfig: KafkaConfig = { brokers: ["localhost:9092"] };
const kafkaService = new KafkaService(kafkaConfig);
kafkaService.producerInit();

// let producer: Producer
// const kafka = new Kafka({ brokers: ["localhost:9092"] })
// what if we use this in prod mode

// export async function producerInit() {
//     producer = kafka.producer()
//     await producer.connect()
// }

const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};

const logger = winston.createLogger(logConfiguration);


export async function send(text: any) {
    // new CustomLogger().showLogger('info', 'Enter into studentsService.ts: GpGetAllValues')
    logger.info('Hello, Winston!');

    let data = JSON.stringify({
        eventType: 'postMedia',
        data: text.data
    });
    let message: ProducerRecord = {
        topic: "notifygql",
        messages: [
            {
                value: data
            }
        ]
    }
    await kafkaService.producerPublicMessage(message);
    // await producer.send({
    //     topic: "KafkaTutorial1",
    //     messages: [
    //         {
    //             value: data
    //         }
    //     ]
    // })
    // try {
    //      producer.send({
    //         topic: "CreateTopic1",
    //         messages: [
    //             {
    //                 value: data
    //             }
    //         ]
    //     })
    //     logger.info(' Message successfully sent');
    //     return "Message Published"
    // } catch (error) {
    //     logger.error(' Unable to send Message');
    // }
    return "Message Published"
}