import { Consumer, Kafka } from 'kafkajs'
import * as winston from 'winston'


const logConfiguration = {
  'transports': [
      new winston.transports.Console()
  ]
};

const logger = winston.createLogger(logConfiguration);


let consumer: Consumer
try {
  const kafka = new Kafka({ brokers: ["localhost:9092"] })
  consumer = kafka.consumer({ groupId: '' + Date.now() });
  logger.info('Kafka broker connected--->>>');


} catch (error) {
  logger.error('..... Unable to connect the kafka broker .....');

}
export const consumerInit = async () => {


  await consumer.connect();

  await consumer.subscribe({ topic: 'KafkaTutorial1', fromBeginning: true })

  let startTime = Date.now();

  // similar to sns alert receiver
  await consumer.run({
    eachMessage: async (data) => {
      //console.log('------------------->>>',data)
      console.log(Date.now() - startTime, data.message.value?.toString());
    }
  });
}