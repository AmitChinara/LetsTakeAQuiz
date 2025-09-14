const ROUTE = {
    API: '/api',
    ADMIN: '/admin',
    TEST: {
        API_CHECK: '/apicheck',
        DB_CHECK: '/dbcheck',
    },
    USER: {
        BASE: '/user',
        SIGNIN: '/signin',
        LOGIN: '/login',
    },
    GAME: {
        BASE: '/game',
        START: '/start',
        SCOREBOARD: '/scoreboard/:userId',
        SUBMIT: '/submit',
        QUIT: '/quit',
    },
}

module.exports = ROUTE;