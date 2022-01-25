import React, { useState, useEffect } from 'react'
import { Route, Link, Switch} from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom'
import { fetchPosts, BASE_URL } from '../api/index';

export default function SinglePost() {
    let history = useHistory();


    // Grabs the id passed in through the link on AllPosts
    const location = useLocation()
    const { id } = location.state


    // fetches all the posts from the database and sets it as State
    const [ posts, setPosts ] = useState([]);
    useEffect( async () => {
        const allPosts = await fetchPosts();
        setPosts(allPosts.data.posts);
    }, [])

    // filters for the post that was clicked on
    const post = posts.find(post => post._id === id)


    // delete post function
    const deletePost = async () => {
        try{
            const response = await fetch(`${BASE_URL}/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })


            history.push('/allPosts');
        }
        catch(err) {
            console.log(err)
        }
    }


    const [currentUser, setCurrentUser] = useState('')
    const testMe = async () => {
        try{
            const response = await fetch(`${BASE_URL}/test/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            const {data: {user: {username}}} = await response.json();
            setCurrentUser(username)
            
        }
        catch(err) {
            console.log(err)
        }
    }
    useEffect( async => {
        testMe()
    })


    let postUserName = post ? post.author.username : ""
    // main jsx
    if (postUserName === currentUser){ 
        return(
            <div id='singlePost'>
                    <div id='singlePostTitle'>{post ? post.title : ""}</div>
                    <div className="singlePostElem"><h2>Description:</h2> <div className="descDiv">{post ? post.description : ""}</div></div>
                    <div className="singlePostElem"><h2>Seller:</h2> {post ? post.author.username : ""}</div>
                    <div className="singlePostElem"><h2>Location:</h2> {post ? post.location : ""}</div>
                    <div className="singlePostElem"><h2>Price:</h2> {post ? post.price : ""}</div>
                    <button id="editPostButton"><Link 
                                                to={
                                                    {pathname:'/EditPost', 
                                                    state: {id: id} }
                                                    }>
                                Edit Post</Link></button>
                                
                    <button id="deletePostButton"
                            onClick={deletePost}><Link 
                                                to={
                                                    {pathname:'/SinglePost', 
                                                    state: { id: post ? post._id : "" } }
                                                    }>
                                Delete</Link></button>
            </div>
        )
    }
    else {
        return (
            <div id='singlePost'>
                    <div id='singlePostTitle'>{post ? post.title : ""}</div>
                    <div className="singlePostElem"><h2>Description:</h2> <div className="descDiv">{post ? post.description : ""}</div></div>
                    <div className="singlePostElem"><h2>Seller:</h2> {post ? post.author.username : ""}</div>
                    <div className="singlePostElem"><h2>Location:</h2> {post ? post.location : ""}</div>
                    <div className="singlePostElem"><h2>Price:</h2> {post ? post.price : ""}</div>
            </div>
        )
    }
}
