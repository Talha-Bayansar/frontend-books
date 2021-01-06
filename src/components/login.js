import React, { useState } from "react";
import "../App.css";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { authenticate } = props;
    return (
        <form className="login__form" onSubmit={(e) => e.preventDefault()}>
            Username:
            <input
                type="text"
                className="login__input"
                onChange={(e) => setUsername(e.target.value)}
            />
            Password:
            <input
                type="text"
                className="login__input"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="login__submit"
                onClick={() => authenticate(username, password)}
            >
                Login
            </button>
        </form>
    );
}

export default Login;
