
import { collection, onSnapshot, query, where } from '@firebase/firestore'
import React, {useContext, useEffect, useState} from 'react'
import Header from '../../../components/Header'
import PostsProfile from '../../../components/PostsProfile'
import ProfileStats from '../../../components/ProfileStats'
import { db } from '../../../firebase'
import Fade from 'react-reveal/Fade';
import { Context } from '../../../Context'



const profile = () => {

    const { user, userFacebook } = useContext(Context)

    const [postsProfile, setPostsProfile] = useState([])

    useEffect(() => (

        onSnapshot(query(collection(db,'posts'),where('userID', '==', user?.uid || userFacebook?.uid)), snapshot => {
            setPostsProfile(snapshot.docs);
        })
        
    ),[db, user,userFacebook])

    return (
        <div className = ' min-h-screen  transition duration-1000 ease-in-out bg-gradient-to-r from-pink-100 via-purple-50 to-white'>
            <Header />
            <ProfileStats postLine />
            <div className = 'flex flex-col max-w-4xl md:mx-auto w-full h-full'>
                <div className = 'flex flex-wrap items-center justify-center gap-2 px-10 md:px-2  md:gap-2 pb-10'>
                    {postsProfile?.map((post, index) => (
                        <PostsProfile key = {index} id = {index} img = {post.data().image}  />
                    ))}   
                </div>
            </div>
        </div>
    )
}

export default profile
