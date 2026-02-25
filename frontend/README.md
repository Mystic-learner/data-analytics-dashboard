# 📊 Data Analytics Dashboard

A full-stack MERN data analytics dashboard that visualizes product sales using interactive charts and filters.

---

## 🚀 Project Overview

This project is a **Data Analytics Dashboard** built using the MERN stack. It allows users to:

* View product sales analytics
* Filter data by date, category, and status
* Visualize insights using multiple charts
* Interact with a clean dark-themed UI

The dashboard fetches data from **MongoDB** and displays it using **Recharts**.

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Recharts
* Axios
* CSS (Dark theme)

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

---

## 📡 API Endpoints

### 🔹 Get Analytics

**GET** `/api/analytics`

**Query Params (optional):**

* `startDate`
* `endDate`
* `category`
* `status`

**Example:**

```
GET /api/analytics?category=Electronics&status=Completed
```

---

## 📸 Dashboard Screenshots

### 🔹 Filters

![Filters](./ss/Filter.png)

### 🔹 Sales by Product

![Sales](./ss/Graph1.png)

### 🔹 Revenue Stream

![Revenue](./ss/Graph2.png)

### 🔹 Performance Growth

![Performance](./ss/Graph3.png)

### 🔹 Category Distribution

![Category](./ss/Graph4.png)

### 🔹 Comprehensive View

![Comprehensive](./ss/Graph5.png)

---

## ⚙️ Steps to Run the Project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Mystic-learner/data-analytics-dashboard.git
cd data-analytics-dashboard
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in **backend/**:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 👩‍💻 Author

**Neha Paladugu**

---

⭐ If you like this project, consider giving it a star!
