import React, { useState } from "react";
import "../App.css";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authenticate } = props;
    async function handleLogin() {
        authenticate(username, password);
        setUsername("");
        setPassword("");
    }
    return (
        <form className="login__form" onSubmit={(e) => e.preventDefault()}>
            Username:
            <input
                type="text"
                className="login__input"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            Password:
            <input
                type="password"
                className="login__input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button className="login__submit" onClick={() => handleLogin()}>
                Login
            </button>
        </form>
    );
}

export default Login;
