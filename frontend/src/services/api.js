// src/api/api.js
import { PATH, VALUE } from "../config/config";

/**
 * Helper function to handle API requests
 * @param {string} endpoint - API endpoint path (like PATH.AUTH.LOGIN)
 * @param {object} options - fetch options (method, headers, body)
 * @param {boolean} useToken - whether to include JWT from localStorage
 */
const apiRequest = async (endpoint, options = {}, useToken = true) => {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };

    // Include Authorization header if token is available
    if (useToken) {
        const token = localStorage.getItem(VALUE.TOKEN_KEY);
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${PATH.API_BASE}${endpoint}`, {
        ...options,
        headers
    });

    // Parse JSON response
    const data = await response.json();

    // Handle errors globally
    if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
    }

    return data;
};

// === Auth API ===
export const authAPI = {
    login: (username, password) =>
        apiRequest(
            PATH.AUTH.LOGIN,
            {
                method: "POST",
                body: JSON.stringify({ username, password })
            },
            false // no auth needed
        ),

    signup: (username, password) =>
        apiRequest(
            PATH.AUTH.SIGNUP,
            {
                method: "POST",
                body: JSON.stringify({ username, password })
            },
            false // no auth needed
        ),

    // Get user profile
    getProfile: () =>
        apiRequest(
            PATH.AUTH.PROFILE,
            { method: "GET" },
            true // auth required, token included automatically
        ),
};

// === Game API ===
export const gameAPI = {
    startGame: (playerName) =>
        apiRequest(PATH.GAME.START, { method: "POST", body: JSON.stringify({ playerName }) }),
    submitAnswer: (gameId, questionId, answer) =>
        apiRequest(PATH.GAME.SUBMIT, { method: "POST", body: JSON.stringify({ gameId, questionId, answer }) }),
    getScoreboard: () =>
        apiRequest(`${PATH.GAME.SCOREBOARD}`, { method: "GET" }),
    getNextQuestion: (gameId) =>
        apiRequest(`${PATH.GAME.QUESTION}/${gameId}`, { method: "GET" }),
};
