# 🛡️ Real-Time Chat Application Using MERN Stack - VaatuChitu.com  

This project is a complete authentication and user management system that covers everything from signup and email verification to password reset and route protection. The frontend is built with **React.js, Tailwind CSS, and modern UI libraries**, while the backend is powered by **Node.js, Express.js, and MongoDB Atlas**.  

Additionally, **Kafka** is integrated for **event-driven logging** and **asynchronous communication** between different services.  

---

## 🚀 Features  

- 🔐 **Signup Endpoint**: User registration and account creation.  
- 📧 **Sending Verify Account Email**: Automated email to verify user accounts.  
- 🔍 **Verify Email Endpoint**: Endpoint for verifying email addresses.  
- 📄 **Building a Welcome Email Template**: Customizable email template for new users.  
- 🚪 **Logout Endpoint**: Secure logout functionality.  
- 🔑 **Login Endpoint**: Secure user login with JWT.  
- 🔄 **Forgot Password Endpoint**: Initiate password reset via email.  
- 🔁 **Reset Password Endpoint**: Securely reset the password.  
- ✔️ **Check Auth Endpoint**: Verify user authentication status.  

---

## 🖥️ Frontend Setup  

- 📋 **Signup Page UI**: User-friendly signup interface.  
- 🔓 **Login Page UI**: Seamless login experience.  
- ✅ **Email Verification Page UI**: Confirmation for email verification.  
- 📤 **Implementing Signup**: Client-side signup logic.  
- 📧 **Implementing Email Verification**: Handle email verification flow.  
- 🔒 **Protecting Our Routes**: Secure protected routes.  
- 🔑 **Implementing Login**: Integrate login functionality.  
- 🏠 **Dashboard Page**: User dashboard after login.  
- 🔄 **Implementing Forgot Password**: Forgot password and reset logic.  

---

## 🔧 .env Configurations  

Ensure you have the following environment variables set up:  

```env
PORT=5000
JWT_SECRET="your_jwt_secret"
MONGO_URL="your_mongodb_connection_url"
OTP_KEY="your_otp_secret"
EMAIL="your_email"
PASSWORD="your_email_password"
APP_PASS="your_app_password"
CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
CLOUDINARY_API_LINK="your_cloudinary_api_url"
IP_ADDRESS=<PRIVATE_IPV4_ADDRESS>
KAFKA_PORT=<Default_kafkaport=9092>
```
# 🛠️ Tech Stack  

### **Frontend:**  
- **React.js**  
- **Tailwind CSS**  
- **React Hot Toast**  
- **Daisy UI**  
- **Zustand**  

### **Backend:**  
- **Node.js**  
- **Express.js**  

### **Database:**  
- **MongoDB Atlas**  

### **Other Services:**  
- **Cloudinary** → Storing user profile images.  
- **NodeMailer** → Email verification & password reset.  
- **Kafka** → Event-driven messaging & logging.  
- **Winston** -> For Real Time Logging And Monitoring.
---


## 🛠️ Kafka Integration  

Kafka is used to ensure **event-driven logging** and **asynchronous communication** for different functionalities:  

| **Feature**                         | **Kafka Usage**                                       |
|-------------------------------------|-------------------------------------------------------|
| 🛡 **Signup**                       | Log user registration events.                         | 
| 🚪 **Logout**                       | Log user activity (track logout time).               |
| 💬 **Send Message**                 | Asynchronous message delivery & storage.             |
| 🤝 **Send Friend Request**          | Log friend request events.                           |
| ✅ **Accept Friend Request**        | Notify the other user about request acceptance.      |
| ❌ **Reject Friend Request**        | Notify the sender about rejection.                   |
| 🔢 **Verify OTP**                   | Log authentication verification attempts.            |
| 📩 **Send OTP for Forgot Password** | Log OTP generation for security tracking.            |
| 🔄 **Reset Password**               | Log password changes & updates.                      |
| 📝 **Edit Profile**                 | Track profile updates for audit purposes.            |

Kafka enables **scalability and fault tolerance**, making the system efficient for real-time chat applications.  



# ▶️ Running the Project  

## **1️⃣ Start Docker Desktop(For Kafka and Zookeeper)**  

**Open Docker Desktop first**, then run the following commands:  

### **Start Zookeeper**  
```sh
docker run -p 2181:2181 zookeeper
```

### Open New Terminal And Run Kafka

```sh
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```

### Backend:
```bash
cd backend
npm run dev
```

### Frontend:
```bash
cd vaatu_chiitu
npm run dev
```

### 🎯 Future Task
- Video Call: Implement video call functionality using Zegocloud.
### 🤝 Contributions
- If you find this project interesting and have ideas for improvement, feel free to contribute! Pull requests are welcome.

### ScreenShots

### Login Form
![Log In Form](https://github.com/user-attachments/assets/8e8a08f9-57e4-403d-93d1-6bdca6407af4)

### Signup Form
![image](https://github.com/user-attachments/assets/bc856c66-cf6a-4008-9348-e1b4af3ad881)

### Email Verification

![image](https://github.com/user-attachments/assets/dd057e71-30f2-4951-a25f-3b69a5342d75)

### Real Time Logging For Monitoring The Activities For Security Purpose 

![image](https://github.com/user-attachments/assets/3a0f9acb-9cfa-4b4e-b105-4d67493542c2)



