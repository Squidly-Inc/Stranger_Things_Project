import React, { useState } from 'react'
import { BASE_URL } from '../api/index';
import { Route, Link, Switch} from 'react-router-dom';


export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [willDeliver, setWillDeliver] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: willDeliver
                }

            })
        })

        const data = await response.json();
        console.log(data)

    }

    return (
        <div id='createOrEdit'>
            <h1>Create A New Post!</h1>
            <form 
                className="createOrEditForm"
                onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title of Post"
                    className="inputItem"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}></input>

                <textarea 
                    type="text" 
                    rows="3" 
                    placeholder="Description"
                    className="inputItem"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}></textarea>

                <input 
                    type="text" 
                    placeholder="Price of Item"
                    className="inputItem"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}></input>

                <input 
                    type="text" 
                    placeholder="Location"
                    className="inputItem"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}></input>

                <div className="inputItem">
                    <label>Will Deliver?</label><br/>

                    <label>True</label>
                    <input 
                        type="radio" 
                        value={true}
                        onChange={(event) => setWillDeliver(event.target.value)}/><br/>

                    <label>False</label>
                    <input 
                        type="radio" 
                        value={false}
                        onChange={(event) => setWillDeliver(event.target.value)}/>
                </div>

                <button 
                    type="submit"
                    id="createPostButton">
                        <Link 
                            to='/AllPosts'>
                        Create New Post! (send to upside down!)
                        </Link>
                </button>
                


            </form>
        </div>
    )
}
