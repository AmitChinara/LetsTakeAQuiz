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

## Setup Instructions
- Backend (Node.js + MongoDB)
  1. Install dependencies:
    ```
    cd backend
    npm install
    ```
  2. Configure MongoDB connection in db/config.js:
    ```
    module.exports = {
      mongoURI: "mongodb://localhost:27017/lets_take_a_quiz"
    };
    ```
  2. Run the server:
    ```
    npm start
    ```
- Analytics Service (Java Spring Boot)
  - Open analytics folder in your Editor.
  - Configure MongoDB connection in application.properties.
  - Run the Spring Boot application.
  ## Database Schema (MongoDB Collections)

### Users Collection
```
{
  "_id": "ObjectId",
  "username": "string",
  "passwordHash": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
### Games Collection
```
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "playerName": "string",        // Name entered before starting the game
  "currentQuestion": 7,          // Tracks current question index
  "score": 120000,               // Current score
  "isWinner": false,             // True if all 15 questions answered correctly
  "status": "in-progress",       // in-progress | completed | quit
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
### Questions Collection
```
{
  "_id": "ObjectId",
  "questionText": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": "string",
  "points": 20000                // Points for this question
}
```

## Game Flow
```
[Login / Signup]
        |
        v
 [Enter Player Name]
        |
        v
 [Start New Game] --------------------------+
        |                                   |
        v                                   |
 [Fetch Question 1]                         |
        |                                   |
        v                                   |
[Answer Submitted]                          |
   |        |        |                      |
   |        |        |                      |
Correct   Wrong     Quit                    |
   |        |        |                      |
   v        v        v                      |
+------+  +------+  +-------------------+   |
| Add  |  | 50%  |  | Keep total points |   |
| full |  |score |  |   earned so far   |   |
|points|  +------+  +-------------------+   |
+------+                               |    |
   |                                   |    |
   v                                   v    v
[Next Question] <----------------- [Game Over]
        |
   (repeat until Q15)
        |
        v
 [All 15 Correct?]
        |
   +----+----+
   |         |
  Yes        No
   |         |
   v         v
["Crorepati" | End with final score
  Popup +    |
  Winner     |
   Crown]    |
             |
             v
        [Scoreboard]
```
