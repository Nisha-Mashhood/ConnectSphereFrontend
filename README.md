# 🌐 ConnectSphere

**A Scalable Mentorship & Collaboration Platform**

![Image]()

![Image]()

![Image]()

![Image]()

![Status]()
![Tech]()
![License]()
![Deployment]()

---

## 📌 Project Description

**ConnectSphere** is a full-stack web application designed to connect **learners and mentors** through structured mentorship, real-time communication, collaboration tools, and secure payments.

The project is built using **Repository Architecture** with **Dependency Injection**, ensuring clean separation of concerns, scalability, and maintainability—aligned with real-world industry standards.

---

## 📑 Table of Contents

* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Project Architecture](#-project-architecture)
* [Installation](#-installation-instructions)
* [Usage](#-usage)
* [API Overview](#-api-documentation)
* [Project Structure](#-project-structure)
* [Environment Variables](#-environment-variables)
* [Deployment](#-deployment)
* [Contributing](#-contributing-guidelines)
* [Visual Preview](#-visual-elements)
* [Author](#-author)

---

## 🚀 Features

### 👤 User & Mentor Management

* User, Mentor, and Admin authentication
* Role-based access control
* Profile management with skills, experience, and availability

### 🤝 Mentorship & Collaboration

* Send & accept mentorship requests
* Paid mentorship via **Stripe**
* One-to-one and group collaborations

### 💬 Communication

* Real-time chat using **Socket.IO**
* Typing indicators
* Media & file sharing
* Push notifications

### 📞 Video Calling

* One-to-one video calls using **WebRTC**
* Group video calls using **Jitsi**

### 🗂 Tasks & Groups

* Task creation and tracking
* Group management
* Activity-based notifications

### 🛠 Admin Panel

* Manage users & mentors
* Monitor payments & collaborations
* Analytics & reports
* Reviews and feedback management

---

## 🧰 Tech Stack

### Frontend

* React + TypeScript
* Vite
* Redux & Redux Persist
* NextUI / (HeroUI)
* Recharts
* Axios
* React Hook Form + Yup
* JWT Authentication
* WebRTC & Jitsi

## 🏗 Project Architecture

### Frontend

* Modular React components
* Centralized API services
* Redux for global state
* Fully typed with TypeScript

---

## ⚙️ Installation Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Nisha-Mashhood/ConnectSphereFrontend.git
cd connectSphere
```
### Step 2: Run Frontend

```bash
cd client
npm install
npm run dev
```

---

## ▶️ Usage

1. Register as a **User** or **Mentor**
2. Complete your profile
3. Send or accept mentorship requests
4. Communicate via chat or video calls
5. Track tasks and collaborations
6. Admin manages users, payments, and reports

---

## 🔗 API Documentation (Overview)

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | `/api/auth/login`         | User login          |
| POST   | `/api/auth/signup`        | User signup         |
| GET    | `/api/mentors`            | Get mentors list    |
| POST   | `/api/mentorship/request` | Send request        |
| POST   | `/api/payment/stripe`     | Payment processing  |
| GET    | `/api/chat/messages`      | Fetch chat messages |

> Detailed API documentation available via Postman collection.

---

## 📁 Project Structure

```text
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── redux/
│   ├── hooks/
│   └── utils/
├── public/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🔐 Environment Variables
### Frontend (`client/.env`)

```env
VITE_BACKEND_URL=http://localhost:3000/api
VITE_PUBLIC_VAPID_KEY=YOUR_VAPID_PUBLIC_KEY

VITE_GOOGLE_CLIENT_ID=your_google_client_id

VITE_GITHUB_CLIENTID=your_github_client_id 
VITE_GITHUB_REDIRECTURI=http://localhost:5173/github/callback 
VITE_GITHUB_URL=https://github.com/login/oauth/authorize

VITE_STRIPE_KEY=your_stripe_public_key 

ENV_MODE=development
```

---

## 🌍 Deployment

* **Frontend**: Vercel
* **Backend**: AWS
* **Database**: MongoDB Atlas

Frontend and backend are deployed **independently** for scalability.

---

## 🤝 Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 🎨 Visual Elements

![Image]()

![Image]()

![Image]()

![Image]()

> Screenshots and demo GIFs .

---

## 👩‍💻 Author

**Nisha Mashhood**
Full-Stack MERN Developer
🔗 GitHub: [https://github.com/Nisha-Mashhood](https://github.com/Nisha-Mashhood)

---

## 📝 Final Note

ConnectSphere is built as a **real-world, production-grade application**, following clean architecture principles, strong typing, and scalable design patterns.
It reflects industry-level practices in authentication, communication, payments, and system design.
