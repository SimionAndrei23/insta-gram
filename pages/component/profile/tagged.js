import { collection, onSnapshot, query } from "@firebase/firestore"
import { useEffect, useState } from "react"
import Header from "../../../components/Header"
import PostSaved from "../../../components/PostSaved"
import ProfileStats from "../../../components/ProfileStats"
import { db } from "../../../firebase"

const tagged = () => {

    const [totalPosts, setTotalPosts] = useState([])

    useEffect(() => {

        onSnapshot(query(collection(db, 'posts')), (snapshot) => {
            setTotalPosts(snapshot.docs);
        })

    },[db])

    return (
        <div className = 'min-h-screen pt-24 transition  duration-1000 ease-out bg-gradient-to-r from-pink-100 via-purple-50 to-white'>
            <Header />
            <ProfileStats tagged />
            <div className = 'flex flex-col max-w-4xl mx-auto w-full h-full'>
                <div className = 'flex flex-wrap items-center gap-2 px-4  md:gap-3 pb-10'>
                    {totalPosts?.map((post, index) => (
                        <PostSaved key = {index} id = {post.id}  />
                    ))}     
                </div>
            </div>
        </div>
    )
}

export default tagged
