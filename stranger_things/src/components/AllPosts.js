import React, { useState, useEffect } from "react";
import { Route, Link, Switch} from 'react-router-dom';
import { fetchPosts} from '../api/index';
import { SinglePost } from './index'

const AllPosts = () => {
    const [ posts, setPosts ] = useState([]);

    useEffect( async () => {
        const allPosts = await fetchPosts();
        setPosts(allPosts.data.posts);
    }, [])

    const fetchPost = async (id) => {
        const post = posts.findIndex(post => post._id === id)
        console.log(id)
        return (
            <Link
                to='/SinglePost'></Link>
        )
        

    };

    let postElements = null;
    if(posts && posts.length){
        postElements = <div>{posts.map((post) => 
                {return (
                        <React.Fragment key={post._id}>
                            <div id='post' key={post._id}>
                                <div id='postTitle'>{post.title}</div>
                                <div id='postDesc'>{post.description}</div>
                                <div id='postPrice'><h2>Price:</h2> {post.price}</div>
                                <div id='postSeller'><h2 className='sellerDetails'>Seller:</h2> {post.author.username}</div>
                                <div id='postLocation'><h2 className='sellerDetails'>Location:</h2> {post.location}</div>
                                {/* <div id='postLocation'><h2 className='sellerDetails'>ID:</h2> {post._id}</div> */}
                                <button id="singlePostButton"><Link 
                                            to={
                                                {pathname:'/SinglePost', 
                                                state: { id: post._id } }
                                                }>
                                View Post</Link></button>
                            </div>
                        </React.Fragment>
                    )
                }
            )
        }</div>
    }

    
    return (
        <div className="allPosts">
            {postElements}
        </div>
    )
}

export default AllPosts;