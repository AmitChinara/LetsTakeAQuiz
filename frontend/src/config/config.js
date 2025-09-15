const PATH = {
    API_BASE: "http://localhost:5000/api", // backend base URL

    AUTH: {
        LOGIN: "/user/login",
        SIGNUP: "/user/signup",
        PROFILE: "/user/profile",
        LOGOUT: "/user/logout",
    },

    GAME: {
        START: "/game/start",
        SUBMIT: "/game/submit",
        SCOREBOARD: "/game/scoreboard",
        QUESTION: "/game/question", // fetch next question
        QUIT: "/game/quit",
    },

    FRONTEND: {
        LOGIN: "/login",
        SIGNUP: "/signup",
        DASHBOARD: "/",
        GAME: "/game",
        SCOREBOARD: "/scoreboard",
    },
};

const VALUE = {
    ENV: process.env.NODE_ENV || "development",
    APP_NAME: "LetsTakeAQuiz",
    TOKEN_KEY: "quiz_token",   // localStorage key for JWT
    COOKIE_TOKEN: "token",     // cookie name if you’re storing JWT in cookies
    DEFAULT_POINTS: 1000,      // fallback points per level
};

export {
    PATH,
    VALUE,
};
