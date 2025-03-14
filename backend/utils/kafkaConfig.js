import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
  clientId: "chat-app",
  brokers: [`${process.env.IP_ADDRESS}:${process.env.KAFKA_PORT}`],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "chat-group" });

const connectKafka = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    console.log("✅ Connected to Kafka");
  } catch (error) {
    console.log(`❌ Kafka connection error: ${error}`);
    process.exit(1);
  }
};

export { kafka, producer, consumer, connectKafka };
