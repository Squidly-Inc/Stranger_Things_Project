import React, { useState, useEffect, } from 'react'
import { Route, Link, Switch} from 'react-router-dom';
import { Home, AllPosts, EditPost, Login, Registration, SinglePost, CreatePost } from './index'

export default function NavBar() {
    const [ isLoggedIn, setIsLoggedIn ] = useState(null)

    useEffect (() => {
        if (localStorage.getItem("token")){
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, [])

    return (
            <>
                <nav>
                    <div>
                        <div className="navLink"><Link to="/Home">Home</Link></div>
                        <div className="navLink"><Link to="/allPosts">All Posts</Link></div>
                        {localStorage.getItem("token") && localStorage.getItem("token").length ?
                        <div className="navLink createPostBTN"><Link to="/CreatePost">Create Post!</Link></div> :
                        ''
                        }
                        <div className="loginLinks">
                            {
                                isLoggedIn ? 
                                <div className="login"><Link to="/Home" onClick={() => {
                                        localStorage.removeItem("token");
                                        setIsLoggedIn(false);
                                        }}>Logout</Link></div> :
                                <>
                                <div className="login"><Link to="/Login">Login</Link></div>
                                <div className="createAccount"><Link to="/Registration">Create Account</Link></div>
                                </>
                            }
                        </div>
                    </div>
                </nav>

            <Switch>
                <Route path="/Home" component={Home} />
                <Route path="/allPosts" component={AllPosts} />
                <Route path="/EditPost" component={EditPost} />
                <Route path="/Login" component={Login} />
                <Route path="/Registration" component={Registration} />
                <Route path="/SinglePost" component={SinglePost} />
                <Route path="/CreatePost" component={CreatePost} />
            </Switch>
        </>
    )
}
