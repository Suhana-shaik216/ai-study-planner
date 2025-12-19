# 📚 AI Study Planner

AI Study Planner is a smart React-based web application that helps students plan their daily study schedule efficiently by distributing study hours across multiple subjects based on deadlines and remaining days.

---

## 🚀 Features

- ➕ Add multiple subjects with deadlines  
- ⏰ Automatically distributes daily study hours smartly  
- 📊 Progress calculation based on days passed vs total days  
- 💾 Data persistence using Local Storage  
- 🗑️ Delete subjects anytime  
- 📱 Clean and responsive UI  

---

## 🧠 Smart Logic Used

- **Progress (%)** is calculated using:
  - `(Days Passed / Total Days) * 100`
- **Daily Study Hours** are distributed using **weight-based logic**
  - Subjects with closer deadlines get more hours

---

## 🛠️ Tech Stack

- **Frontend:** React JS
- **Styling:** CSS
- **State Management:** React Hooks
- **Storage:** Browser Local Storage

---

## 📸 Screenshots

> (You can add screenshots here later)

---

## ⚙️ How to Run Locally

```bash
git clone https://github.com/suhana-shaik26/ai-study-planner.git
cd ai-study-planner
npm install
npm start
## open

http://localhost:3000
