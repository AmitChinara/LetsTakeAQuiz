# LetsTakeAQuiz

Let's Take A Quiz is a KBC-style quiz game built with **React.js**, **Node.js**, **Java (Spring Boot)**, and **MongoDB**. Players answer 15 progressively scored questions, track their progress, and can resume games. Perfect games are rewarded with a **“Crorepati” popup** and a **crown icon** on the personal scoreboard.

---

## Features

- **User authentication** (signup/login)  
- **15-question gameplay** with progressive points  
- **Correct/wrong/quit rules:**  
  - Correct: full points  
  - Wrong: 50% of total points earned so far  
  - Quit: total points earned so far  
- **Resume in-progress games** after window/tab close  
- **Crorepati popup** for completing all 15 questions  
- **Personal scoreboard** with crowns for perfect games  
- **Player name** can be entered per game session  
- **Analytics microservice** (Java/Spring Boot) for stats and insights  
- **MongoDB** for storing users, games, questions, and scores  

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS (optional)  
- **Backend:** Node.js (Express)  
- **Database:** MongoDB  
- **Analytics Microservice:** Java (Spring Boot)  

---

## Project Structure
```
LetsTakeAQuiz/
├── backend/ # Node.js backend
│ ├── controllers/ # API controllers
│ ├── routes/ # API routes
│ ├── services/ # Game logic and scoring
│ └── db/ # MongoDB connection
├── frontend/ # React.js frontend
│ ├── components/ # Reusable UI components
│ │ ├── QuestionCard.js
│ │ ├── ScoreBoard.js
│ │ └── LifelineButtons.js
│ └── pages/ # Main pages
│ ├── Home.js
│ ├── Dashboard.js
│ └── GamePlay.js
├── analytics/ # Java Spring Boot microservice
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/ # Java source code
│ │ │ └── resources/ # application.properties, configs
│ │ └── test/ # Unit tests
└── README.md # Project README
```
