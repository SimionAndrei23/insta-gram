import { useContext, useEffect, useRef, useState } from "react"

import {ArrowLeftIcon,CameraIcon, HeartIcon, ChatIcon, PaperAirplaneIcon, DotsVerticalIcon, VolumeUpIcon, UserIcon } from '@heroicons/react/outline'

import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'

import NumberFormat from 'react-number-format'

import { collection, deleteDoc, doc, onSnapshot, setDoc } from "@firebase/firestore"

import { db } from "../firebase"

import { Context } from "../Context"

const Reels = ( {setReelsModal,id,avatar,comments, likes,video,name,description,song} ) => {


    const { user, userFacebook } = useContext(Context)

    const [hasLiked, setHasLiked] = useState(false)

    const [likesHeart, setLikesHeart] = useState([])

    const [isPlayingReels, setIsPlayingReels] = useState(false)

    const reelsRef = useRef(null)

    const videoReels = () => {

        if(isPlayingReels) {

            reelsRef.current.pause()

            setIsPlayingReels(false)

        }

        else {

            reelsRef.current.play()

            setIsPlayingReels(true)
        }

    }

    useEffect(() => {

        onSnapshot(collection(db, 'reels', id, 'likes'), (snapshot) => setLikesHeart(snapshot.docs))
 
    },[db,id])
 
    useEffect(() => {
 
         // !== -1 means that is not false!
 
         setHasLiked(likesHeart.findIndex((like) => (like.id === user?.uid || userFacebook?.uid)) !== -1)
 
    }, [likesHeart])

    const likePost = async () => {

        if(hasLiked) {

           await deleteDoc(doc(db, 'reels', id, 'likes', user?.uid || userFacebook?.uid))

        }

        else {

             await setDoc(doc(db, 'reels', id, 'likes', user?.uid || userFacebook?.uid), {

               username: 'Andrew'
   
            })

        }

   }
    
    return (
        <div className = 'relative w-full h-full snap-start '>
           <video ref = {reelsRef} onClick = {videoReels} className = 'w-full h-full object-fill' loop src = {video} />
           <div className = 'absolute top-0 left-0 w-full flex items-center justify-between gap-6 p-4'>
               <ArrowLeftIcon onClick = {() => setReelsModal(false)} className = 'iconsReels' />
               <span className = 'font-semibold text-white flex-1'> Reels </span>
               <CameraIcon className = 'iconsReels' />
           </div>
           <div className = 'absolute bottom-16 right-2 flex flex-col items-center gap-4'>
               <div className = 'relative flex flex-col items-center gap-2'>
                   {
                       hasLiked ? (
                        <HeartIconFilled onClick = {likePost}  className = 'iconsReels' />
                       ) : (
                        <HeartIcon onClick = {likePost}  className = 'iconsReels' />
                       )
                   }
                   <div className = 'flex  items-center gap-2'>
                        <span className = 'text-white text-sm transition duration-1000 ease-out'>
                            {!!likesHeart.length && (
                                <div className = ''>
                                    {likesHeart.length < 2 ? likesHeart.length : ''}
                                    {' '}
                                    {likesHeart.length >= 2 ? likesHeart.length : ''}
                                </div>
                            )}
                        </span>
                   </div>
               </div>
               <div className = 'flex flex-col items-center gap-2'>
                   <ChatIcon className = 'iconsReels' />
                   <span className = 'text-white text-sm'>
                       <NumberFormat value = {comments} displayType = 'text' thousandSeparator = {true} /> 
                   </span>
               </div>
               <PaperAirplaneIcon className = 'iconsReels rotate-45' />
               <DotsVerticalIcon className = 'iconsReels' />
               <div className = 'relative w-10 h-10 overflow-hidden cursor-pointer'>
                   <img src = {avatar} alt = 'userProfile' className = 'absolute  w-full h-full object-cover rounded-xl border-2 border-white' />
               </div>
           </div>
           <div className = 'absolute bottom-10 left-5 flex flex-col gap-2'>
                <div className = 'flex items-center gap-4'>
                    <div className = 'relative w-8 h-8 overflow-hidden'>
                        <img src = {avatar} alt = 'userProfile' className = 'absolute  w-full h-full rounded-full  border-white'/>
                    </div>
                    <span className = 'font-semibold text-sm text-white'> {name} </span>
                    <h1 className = 'text-center py-1 px-4 text-sm border rounded-md text-white border-white cursor-pointer'> Follow </h1>
                </div>
                <span className = 'text-white text-sm '> {description} </span>
                <div className = 'flex items-center gap-2'>
                    <VolumeUpIcon className = 'animate-pulse w-3 h-3 mt-1 text-white' />
                    <div className = 'w-auto'>
                        <span className = 'text-white text-sm'> {song} </span>
                    </div>
                    <UserIcon className = 'w-3 h-3 mt-1 text-white' />
                    <span className = 'text-sm text-white mt-1'> {name} </span>
                </div>
           </div>
        </div>
    )
}

export default Reels
