import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { BASE_URL } from '../api/index'

export default function Login() {
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${BASE_URL}/users/login`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        user: {
                            username: username,
                            password: password
                        }
                    }
                )
            }
        )

        if (response){
            const { data: { token }} = await response.json();
            localStorage.setItem("token", token)

            setUsername('');
            setPassword('');

            history.push('/allPosts');}
            window.location.reload();
    }

    return (
        <div className="loginAndReg">
            <form onSubmit={handleSubmit} className="loginForm">
                <div className="username">
                    <label>Username: </label>
                    <input 
                        type="text" 
                        value={username} 
                        placeholder="Enter Username"
                        onChange={(event => setUsername(event.target.value))}
                    />
                </div>

                <div className="password">
                    <label>Password: </label>
                    <input 
                        type="text" 
                        value={password} 
                        placeholder="Enter Password"
                        onChange={(event => setPassword(event.target.value))}
                    />
                </div>

                <button type="submit" className="loginBtn">
                    GO GO GADGET LOGIN!
                </button>
            </form>
        </div>
    )
}