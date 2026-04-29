# 🎖️ NCC Management System

A modern, cloud-based platform to manage NCC cadets, camps, training programs, and daily activities—built for efficiency, scalability, and real-time tracking.


---

## 🧠 Overview

The NCC Management System is a full-stack web application designed to replace manual record-keeping with a centralized digital system.

It enables:

- Efficient cadet data management  
- Structured training and camp organization  
- Real-time attendance tracking  
- Cloud-based data storage  

---

## ✨ Features

### 👤 Cadet Management
- Create, update, and manage cadet profiles  
- Store rank, unit, and personal details  
- Attendance tracking  

### 🏕️ Camp Management
- Create and schedule camps  
- Assign cadets  
- Track participation  

### 🏃 Training Management
- Schedule training sessions  
- Assign instructors  
- Monitor progress  

### 📅 Daily Practice Tracking
- Manage daily schedules  
- Record attendance  
- Maintain logs  

### ☁️ Cloud Integration
- Real-time updates via Firebase Firestore  
- Scalable and secure storage  

---

---

## 🛠️ Tech Stack

### Frontend
- Next.js  
- React  
- TypeScript  

### Backend
- Node.js  

### Database
- Firebase Firestore  

---

## ⚙️ Getting Started

1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ncc-management-system.git
cd ncc-management-system

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env.local file in the root directory:

NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

4️⃣ Run the Development Server
npm run dev

App will run at:
👉 http://localhost:3000

📂 Project Structure
ncc-management-system/
├── components/
├── pages/
├── services/
├── utils/
├── public/
├── styles/
└── screenshots/

🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.
