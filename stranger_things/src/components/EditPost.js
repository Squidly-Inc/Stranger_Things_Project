import React, { useState, useEffect } from 'react'
import { Route, Link, Switch} from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom'
import { fetchPosts, BASE_URL } from '../api/index';

function EditPost() {
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

    // filters for the post that was clicked on (broken and cant fix)
    const post = posts.find(post => post._id === id)
    const [title, setTitle] = useState(post ? post.title : "")
    const [description, setDescription] = useState(post ? post.description : "")
    const [price, setPrice] = useState(post ? post.price : "")
    const [locationInput, setLocation] = useState(post ? post.location : "")
    const [willDeliver, setWillDeliver] = useState(false)


    return (
        <div id='createOrEdit'>
            <h1>Create A New Post!</h1>
            <form 
                className="createOrEditForm"
            >   
                <label>Title: </label>
                <input 
                    type="text" 
                    placeholder="Title of Post"
                    className="inputItem"
                    value={title}></input>

                <label>Description: </label>
                <textarea 
                    type="text" 
                    rows="3" 
                    placeholder="Description"
                    className="inputItem"
                    value={description}></textarea>

                <label>Price of Item: </label>
                <input 
                    type="text" 
                    placeholder="Price of Item"
                    className="inputItem"
                    value={price}
                    ></input>

                <label>Location: </label>
                <input 
                    type="text" 
                    placeholder="Location"
                    className="inputItem"
                    value={locationInput}
                    ></input>

                <div className="inputItem">
                    <label>Will Deliver?</label><br/>

                    <label>True</label>
                    <input 
                        type="radio" 
                        value={true}
                        /><br/>

                    <label>False</label>
                    <input 
                        type="radio" 
                        value={false}
                        />
                </div>

                <button 
                    type="submit"
                    id="createPostButton">
                        <Link 
                            to='/AllPosts'>
                        Finish Editing!
                        </Link>
                </button>
                


            </form>
        </div>
    )
}

export default EditPost;