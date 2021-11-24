import React, { useState, useEffect } from "react";
import { Route, Link, Switch} from 'react-router-dom';
import { fetchPosts } from "../api/index";

const App = () => {
    const BASE_URL = 'https://strangers-things.herokuapp.com/api/2008-USD-RM-WEB-PT'

    const [ posts, setPosts ] = useState([]);

    useEffect( async () => {
        const allPosts = await fetchPosts();
        setPosts(allPosts.data.posts);
    })

    let postElements = null;
    if(posts && posts.length){
        postElements = <div>{posts.map((post) => 
            {return (
                    <React.Fragment>
                        <div id='post' key={post._id}>
                            <div id='postTitle'>{post.title}</div>
                            <div id='postDesc'>{post.description}</div>
                            <div id='postPrice'><h2>Price:</h2> {post.price}</div>
                            <div id='postSeller'><h2 className='sellerDetails'>Seller:</h2> {post.author.username}</div>
                            <div id='postLocation'><h2 className='sellerDetails'>Location:</h2> {post.location}</div>
                        </div>
                    </React.Fragment>
                    )
                }
            )
        }</div>
    }

    
    return (
        <div className="app-page-view">
            {postElements}
        </div>
    )
}

export default App;