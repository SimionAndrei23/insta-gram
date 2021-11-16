import Header from "../../components/Header"
import { ChevronLeftIcon, PlayIcon, ChatIcon } from '@heroicons/react/outline'
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../firebase"
import { useRouter } from "next/router"
import PostSaved from "../../components/PostSaved"

const savedPosts = () => {

    const router = useRouter()

    const [posts, setPosts] = useState([])

    const [isShown, setIsShown] = useState(false)


    useEffect(() => {

        onSnapshot(collection(db, 'posts'), (snapshot) => setPosts (snapshot.docs))

   },[])

    return (
        <div className = 'min-h-screen  overflow-y-auto'>
            <Header />
            <div className = 'mt-10'>
               <div className = 'flex flex-col max-w-6xl w-full h-full mx-auto'>
                  <div onClick = { () => router.push('/')} className = 'flex items-center cursor-pointer'>
                       <ChevronLeftIcon className = 'h-8 w-8 cursor-pointer text-gray-300' />
                       <span className = 'text-gray-500'> Saved </span>
                  </div>
                  <div className = 'flex items-center cursor-pointer'>
                      <span className = 'font-semibold pl-3 py-2'>All Posts</span>
                  </div>
                  <div className = 'flex flex-wrap gap-4 md:gap-6 pl-3 mt-5 pb-10'>
                    {posts?.map((post, index) => (
                        <PostSaved key = {index} id = {post.id}  />
                    ))}
                  </div>
               </div>
            </div>
        </div>
    )
}

export default savedPosts
