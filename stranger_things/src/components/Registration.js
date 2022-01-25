import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { BASE_URL } from '../api/index'

export default function Registration() {
    let history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify ({
                user: {
                    username: username,
                    password: password
                }
            })
        });

        const { data: { token }} = await response.json();
        localStorage.setItem("token", token)

        setUsername('');
        setPassword('');
        history.push('/allPosts');
        window.location.reload();
    }


    return (
        <div className="loginAndReg">
            <form onSubmit={handleSubmit} className="loginForm">
                <div className="username">
                    <label>Username: </label>
                    <input 
                        type="text" 
                        placeholder="Create Username" 
                        value={username} 
                        onChange={(event) => setUsername(event.target.value)}>
                    </input>
                </div>

                <div className="password">
                    <label>Password: </label>
                    <input 
                        type="text" 
                        placeholder="Create Password" 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)}>
                    </input>
                </div>

                <button type="submit" className="loginBtn">
                    Create New Account!
                </button>
            </form>
        </div>
    )
}
