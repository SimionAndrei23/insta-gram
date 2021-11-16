import { collection, onSnapshot, orderBy, query, where } from "@firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { Context } from "../Context"
import { db } from "../firebase"
import Post from "./Post"



function Posts() {

    const { user, userFacebook } = useContext(Context)

    const [posts, setPosts] = useState([])

    const [postsProfile, setPostsProfile] = useState([])

    // snapshot is a real time listener!

    // We need to add the cleanup function for better experience!

    // Also we need to pass our db as a depedency value for useEffect!

    useEffect(() => (

        onSnapshot(query(collection(db,'posts'),orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs);
        })
        
    ),[db])
    
    return (
        <div>
            {posts.map((post,index) => (
                <Post key = {index} id = {post.id} nameUser = {post.data().username} userImg = {post.data().profileUser} img = {post.data().image} caption = {post.data().caption} timestampPost = {new Date(post.data().timestamp?.toDate()).toUTCString()} />
            ))}
        </div>
    )
}

export default Posts
