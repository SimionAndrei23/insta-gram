import { collection, onSnapshot, query } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Header from "../../../components/Header"
import PostSaved from "../../../components/PostSaved"
import ProfileStats from "../../../components/ProfileStats"
import { db } from "../../../firebase"

const saved = () => {

    const [totalPosts, setTotalPosts] = useState([])

    useEffect(() => {

        onSnapshot(query(collection(db, 'posts')), (snapshot) => {
            setTotalPosts(snapshot.docs);
        })

    },[db])

    return (
        <div className = 'min-h-screen transition duration-1000 ease-in-out  bg-gradient-to-r from-pink-100 via-purple-50 to-white'>
            <Header />
            <ProfileStats postSaved />
            <div className = 'flex flex-col max-w-4xl mx-auto w-full h-full'>
                <div className = 'flex flex-wrap items-center justify-center gap-2 px-10 md:px-0  md:gap-3 pb-10'>
                    {totalPosts?.map((post, index) => (
                        <PostSaved noTilt key = {index} id = {post.id}  />
                    ))}     
                </div>
            </div>
        </div>
    )
}

export default saved
