import React from 'react'
import strangerThings from '../materials/stranger-things-companion.png'; 
import { Route, Link, Switch} from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1 className="banner">Welcome to Stranger Things!</h1>
            <h2 className="h2_message">
                <Link className="normal" to="/Login">Login </Link> 
                or 
                <Link className="normal" to="/Registration"> Create an Account </Link>
                by clicking the top right hand corner Nav Bar options</h2>
            <img src={strangerThings}/>
        </div>
    )
}
