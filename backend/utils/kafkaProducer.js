import { producer } from "./kafkaConfig.js";

const sendMessageToKafka = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(` Message sent to Topic: ${topic}`);
  } catch (error) {
    console.log(`❌ Kafka error: ${error}`);
  }
};

export default sendMessageToKafka;
