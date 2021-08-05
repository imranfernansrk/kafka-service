import { KafkaService } from "@bambe/kafka";
import { ConsumerConfig, ConsumerSubscribeTopic, KafkaConfig } from "kafkajs";
import { kafkaReceiver } from "./KafkaReceiver";

export async function createSubscription() {

    const kafkaConfig: KafkaConfig = { brokers: ["localhost:9092"] };
    const kafkaService = new KafkaService(kafkaConfig);

    const consumer: ConsumerConfig = { groupId: 'kafka1' }
    kafkaService.consumerInit(consumer);
    const subscribe: ConsumerSubscribeTopic = { topic: 'notifygql', fromBeginning: true };
    kafkaService.consumerSubscribe(subscribe);

    kafkaService.consumerRunMessage(kafkaReceiver);
}