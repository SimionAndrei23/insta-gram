import { collection, deleteDoc, doc, onSnapshot, setDoc } from "@firebase/firestore"
import { HeartIcon } from "@heroicons/react/outline"
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid';
import { useContext, useEffect, useState } from "react"
import { Context } from "../Context";
import { db } from "../firebase"

const Comment = ( {id,idPost, image, username, comment}) => {

    const { user, userFacebook } = useContext(Context)

    const [hasLikedComment, setHasLikedComment] = useState(false)


    const [likesComments, setLikesComments] = useState([])


    useEffect(() => {

        onSnapshot(collection(db, 'posts', idPost, 'comments',id, 'likes'), (snapshot) => setLikesComments(snapshot.docs))

    },[db,id])

    useEffect(() => {

        // !== -1 means that is not false!
    
            setHasLikedComment(likesComments.findIndex(like => (like.id === user?.uid || userFacebook?.uid)) !== -1)
    
    }, [likesComments])

    const sendHeart = async () => {

            if(hasLikedComment) {

                await deleteDoc(doc(db, 'posts', idPost, 'comments', id, 'likes', user?.uid || userFacebook?.uid))

              }

              else {

                await setDoc(doc(db, 'posts', idPost, 'comments', id, 'likes',user?.uid || userFacebook?.uid), {

                username: user?.name || userFacebook?.name
    
             })

         }

    }

    return (
        <div className = 'flex items-center space-x-2 mb-3 px-4 cursor-pointer overflow-x-hidden' key = {id}>
            <img className = 'h-8 w-8 rounded-full' src = {image} alt = '' />
            <p className = 'flex-1'> <span className = 'font-bold'> {username}</span> {" "} {comment} </p>
            {
                hasLikedComment ? (
                    <HeartIconFilled onClick = {sendHeart} className = 'w-4 h-4' />
                ) : (
                    <HeartIcon onClick = {sendHeart} className = 'w-4 h-4' />
                )
            }
        </div>
    )
}

export default Comment
