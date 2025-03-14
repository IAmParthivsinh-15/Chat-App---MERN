import { consumer } from "./kafkaConfig.js";

const consumeMessages = async () => {
  try {
    console.log("✅ Kafka Consumer Connected!");

    await consumer.subscribe({ topic: "email-events", fromBeginning: false });
    await consumer.subscribe({ topic: "user-logout", fromBeginning: false });
    await consumer.subscribe({ topic: "user-signup", fromBeginning: false });
    await consumer.subscribe({
      topic: "friend-request-send",
      fromBeginning: false,
    });
    await consumer.subscribe({
      topic: "friend-request-accept",
      fromBeginning: false,
    });
    await consumer.subscribe({
      topic: "friend-request-reject",
      fromBeginning: false,
    });
    await consumer.subscribe({
      topic: "otp-verification",
      fromBeginning: false,
    });
    await consumer.subscribe({
      topic: "password-reset",
      fromBeginning: false,
    });
    await consumer.subscribe({
      topic: "user-profile-updated",
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const receivedMessage = JSON.parse(message.value.toString());
        console.log(`📩 Received message from ${topic}:`, receivedMessage);
        console.log(
          `📩 Received message from ${topic} (Partition: ${partition}):`
        );

        switch (topic) {
          case "email-events":
            console.log(
              `✉️ Email sent to: ${receivedMessage.userId} - Status: ${receivedMessage.username}`
            );
            break;

          case "user-signup":
            console.log(`👤 New User Signed Up: ${receivedMessage.username}`);
            break;

          case "user-logout":
            console.log(`👤 User Logged Out: ${receivedMessage.username}`);
            break;

          case "friend-request-send":
            console.log(
              `👥 Friend Request Sent: ${receivedMessage.senderId} to ${receivedMessage.receiverId}`
            );
            break;

          case "friend-request-accept":
            console.log(
              `👥 Friend Request Accepted: ${receivedMessage.senderId} to ${receivedMessage.receiverId}`
            );
            break;

          case "friend-request-reject":
            console.log(
              `👥 Friend Request Rejected: ${receivedMessage.senderId} to ${receivedMessage.receiverId}`
            );
            break;

          case "otp-verification":
            console.log(`🔐 OTP Verification: ${receivedMessage.username}`);
            break;

          case "password-reset":
            console.log(`🔑 Password Reset: ${receivedMessage.userId}`);
            break;

          case "user-profile-updated":
            console.log(
              `👤 User Profile Updated - userId: ${receivedMessage.userId}, 
              Username: ${receivedMessage.username}, 
              Fullname: ${receivedMessage.fullname}, 
              Bio: ${receivedMessage.bio}, 
              Gender: ${receivedMessage.gender}`
            );
            break;

          default:
            console.log(`⚠️ Unknown event received: ${topic}`);
        }
      },
    });
  } catch (error) {
    console.log(`❌ Kafka error in Consumer: ${error}`);
  }
};

consumeMessages();
export default consumeMessages;
