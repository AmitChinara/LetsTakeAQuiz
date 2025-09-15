import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PATH } from "./config/config";

// Pages / Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import Scoreboard from "./pages/Scoreboard";

// ✅ Private Route Wrapper (checks token before allowing access)
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("quiz_token"); // you can use VALUES.TOKEN_KEY
    return token ? children : <Navigate to={PATH.FRONTEND.LOGIN} replace />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Auth Routes */}
                <Route path={PATH.FRONTEND.LOGIN} element={<Login />} />
                <Route path={PATH.FRONTEND.SIGNUP} element={<Signup />} />

                {/* Protected Routes */}
                <Route
                    path={PATH.FRONTEND.DASHBOARD}
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={PATH.FRONTEND.GAME}
                    element={
                        <PrivateRoute>
                            <Game />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={PATH.FRONTEND.SCOREBOARD}
                    element={
                        <PrivateRoute>
                            <Scoreboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
