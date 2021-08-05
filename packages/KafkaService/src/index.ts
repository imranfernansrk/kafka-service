import { Consumer, ConsumerConfig, ConsumerSubscribeTopic, Kafka, KafkaConfig, Producer, ProducerRecord } from "kafkajs";
export class KafkaService {
    public kafkaConsole = () => {
        console.log('====================================');
        console.log('Success console of Kafka Service');
        console.log('====================================');
    }
    private kafka: Kafka;
    private producer: Producer | undefined;
    private consumer: Consumer | undefined;

    constructor(configDetails: KafkaConfig) {
        this.kafka = new Kafka(configDetails);
        // this.producer = this.kafka.producer();
        // this.consumer = this.kafka.consumer({ groupId: '' });
        console.log('====================================');
        console.log('Kafka Config Success', configDetails);
        console.log('====================================');
    }
    // public kafkaConfiguration = () => {
    //     const kafka = new Kafka({ brokers: ["localhost:9092"] });
    //     console.log('====================================');
    //     console.log('Kafka Config Success');
    //     console.log('====================================');
    // }
    public async producerInit() {
        this.producer = this.kafka.producer();
        await this.producer.connect();
        console.log('====================================');
        console.log('Producer init connected');
        console.log('====================================');
    }
    public async producerPublicMessage(payload: ProducerRecord) {
        if (this.producer == undefined) {
            console.log('====================================');
            console.log('producer not yet initiated');
            console.log('====================================');
            return null;
        }
        try {
            this.producer.send(payload);
            console.log('====================================');
            console.log('Message Publish Successfully', payload);
            console.log('====================================');
        } catch (error) {
            console.log('====================================');
            console.log('Message Publish Failed to Send', error);
            console.log('====================================');
        }
    }
    public async consumerInit(consumerConfig?: ConsumerConfig) {
        this.consumer = this.kafka.consumer(consumerConfig);
        await this.consumer.connect();
        console.log('====================================');
        console.log('Consumer init connected');
        console.log('====================================');
    }
    public async consumerSubscribe(subscriptionTopic: ConsumerSubscribeTopic) {
        if (this.consumer == undefined) {
            console.log('====================================');
            console.log('consumer not yet initiated');
            console.log('====================================');
            return null;
        }
        await this.consumer.subscribe(subscriptionTopic);
        console.log('====================================');
        console.log('Consumer Subscribe to the topic --->', subscriptionTopic);
        console.log('====================================');
    }
    public async consumerRunMessage(kafkaReceiverMethhod: any) {
        if (this.consumer == undefined) {
            console.log('====================================');
            console.log('consumer not yet initiated');
            console.log('====================================');
            return undefined;
        }
        await this.consumer.run({
            eachMessage: async (data: any) => {
                // console.log('====================================');
                // console.log(data.message.value?.toString());
                // console.log('====================================');
                kafkaReceiverMethhod(data.message.value?.toString());
            }
        })
    }
}