import { Consumer, Kafka} from 'kafkajs'


let consumer: Consumer
const kafka = new Kafka({ brokers: ["localhost:9092"] })
export const consumerInit = async () => {
    
  consumer = kafka.consumer({ groupId: '' + Date.now() });

  await consumer.connect();

  await consumer.subscribe({ topic: 'CreateTopic1', fromBeginning: true })

  let startTime = Date.now();

  await consumer.run({ 
    eachMessage: async (data) => {
      //console.log('------------------->>>',data)
      console.log(Date.now() - startTime, data.message.value?.toString());
    }
  });
}