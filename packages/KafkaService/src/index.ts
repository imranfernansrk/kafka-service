import { Kafka } from "kafkajs";
export class KafkaService{
    public kafkaConsole = () => {
        console.log('====================================');
        console.log('Success console of Kafka Service');
        console.log('====================================');
    }
    public kafkaConfiguration = () => {
        const kafka = new Kafka({ brokers: ["localhost:9092"] });
        console.log('====================================');
        console.log('Kafka Config Success');
        console.log('====================================');
    }
}