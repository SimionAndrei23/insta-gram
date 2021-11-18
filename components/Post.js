
import { ChevronLeftIcon,BookmarkIcon,ChatIcon,DotsHorizontalIcon,DotsVerticalIcon,EmojiHappyIcon,HeartIcon,PaperAirplaneIcon,BadgeCheckIcon,XIcon } from '@heroicons/react/outline'
import faker from 'faker'
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid';
import {BookmarkIcon as BookmarkIconFilled} from '@heroicons/react/solid';
import { useState, useEffect, useContext } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "@firebase/firestore";
import { db } from "../firebase";
import Moment from 'react-moment'
import Comment from './Comment';
import Truncate from 'react-truncate';
import router  from 'next/router'
import Fade from 'react-reveal/Fade';
import SendSuggestions from './SendSuggestions';
import React  from 'react';
import Image from 'next/image';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Context } from '../Context';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';



function Post( {id, nameUser, userImg, img, caption,timestampPost}) {


    const { user,username, userFacebook, usernameFacebook, modalHorizontal, setModalHorizontal } = useContext(Context)

    const [inputUsers, setInputUsers] = useState([])

    const [suggestions, setSuggestions] = useState([])

    const [inputSuggestions, setInputSuggestions] = useState('')

    const [sendModal ,setSendModal] = useState(false)

    const [input, setInput] = useState('');

    const [savedPost, setSavedPost] = useState(false)

    const [inputModal, setInputModal] = useState('')

    const [emojiSelected, setEmojiSelected] = useState(false)
    
    const [emojiPicker, setEmojiPicker] = useState('')


    const [openModalComment, setOpenModalComment] = useState(false)

    const [comments, setComments] = useState([])

    const [likes, setLikes] = useState([])

    const [hasLiked, setHasLiked] = useState(false)

    const [truncate, setTruncate] = useState(false)

    const [posts, setPosts] = useState([])

    const [exists, setExists] = useState(false)

    const [savedPosts, setSavedPosts] = useState([])

    const [saved, setSaved] = useState([])

    const [hasSavedPost, setHasSavedPost] = useState(false)

    useEffect(() => {
        const suggestions = [...Array(10)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));

        setSuggestions(suggestions)

        return suggestions;

    },[])


    useEffect(() => {

        onSnapshot(query(collection(db, 'posts', id, 'savedPosts'), where('postID', '==', id)), (snapshot) => {
            setPosts(snapshot.docs);
        })

    },[db,id])


   useEffect(() => {

    onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'asc')), (snapshot) => {
        setComments(snapshot.docs);
    })
    
   }, [db,id])

   useEffect(() => {

       onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => setLikes(snapshot.docs))

   },[db,id])

   useEffect(() => {

        // !== -1 means that is not false!

        setHasLiked(likes.findIndex((like) => (like.id === user?.uid || userFacebook?.uid)) !== -1)

   }, [likes])

   useEffect(() => {

        onSnapshot(collection(db, 'posts', id, 'savedPosts'), (snapshot) => setSavedPosts (snapshot.docs))

   },[db,id])

   useEffect(() => {

        setHasSavedPost(savedPosts.findIndex((savePost) => (savePost.id === user?.uid || userFacebook?.uid)) !== -1)

   },[savedPosts])

    const sendComment = async (e) => {

        e.preventDefault();

         await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: input,
            userName: username || usernameFacebook,
            userImage: user?.photo || userFacebook?.photo,
            timestamp: serverTimestamp()
        })

        setInput('');


    }

    const likePost = async () => {

         if(hasLiked) {

            await deleteDoc(doc(db, 'posts', id, 'likes', user?.uid || userFacebook?.uid))

         }

         else {

              await setDoc(doc(db, 'posts', id, 'likes', user?.uid || userFacebook?.uid), {

                username: user?.name || userFacebook?.name
    
             })

         }

    }

    const closeModal = (e) => {

        if(e.target.classList.contains('fixed'))
        {
            setOpenModalComment(false)
        }

    }

    const savePost = async () => {

        await setSavedPost(!savedPost)

        if(hasSavedPost)
        {
              return;
        }

        else
        {
            await setDoc(doc(db, 'posts', id, 'savedPosts', user?.uid || userFacebook?.uid), {
                postID: id,
                postImage: img,
                userID: user?.uid || userFacebook?.uid,
                username: user?.name || userFacebook?.name,
                timestamp: serverTimestamp()
                
            }, {merge: true})
        }

    }

    const routeSavedPosts = () => {

        router.push({
            pathname: 'component/savedPosts',
            query: { id: id}
        })

    }

    const sendModalState = (e) => {

        if(e.target.classList.contains('sendContainer'))
        {
            setSendModal(false)
        }
    }

    const deleteInputUser = (user) => {

        setInputUsers(inputUsers.filter(inputUser => inputUser !== user))

    }

    const emojiSelect = async (emoji) => {

        await setEmojiPicker(emoji)

        let inputUpdated = emojiPicker ? input + emojiPicker.native : input;

        if(inputUpdated)
        {
            setInput(inputUpdated);
        }

        else
        {
            setInput('');
        }
    }

    return (
        <div className = 'flex flex-col bg-white overflow-hidden  my-8 shadow-2xl '>

            {sendModal ? (
                <div onClick = {sendModalState} className = 'sendContainer fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 transition transform duration-1000 ease-out'>
                    <Fade>
                        <div className = 'w-full h-full md:w-1/3 md:h-[38rem]  rounded-sm bg-gradient-to-l from-gray-300 to-purple-200'>
                            <div className = 'flex items-center justify-between px-4 py-2 border-b-2 border-gray-400 border-opacity-25'>
                                <div></div>
                                <span className = 'font-semibold text-black text-lg'> Share </span>
                                <XIcon className = 'w-8 h-8 cursor-pointer text-gray-400 hover:text-gray-500' onClick = { () => setSendModal(false)} />
                            </div>
                            <div className = 'flex justify-start items-center flex-wrap overflow-hidden gap-4 p-2 border-b-2 border-gray-400 border-opacity-25'>
                                <span className = 'font-semibold text-lg'> To: </span>
                                {inputUsers?.map((inputUser,index) => (
                                    <div key = {index} className = 'flex items-center justify-center gap-1 p-1 bg-blue-500 bg-opacity-40'>
                                        <span className = 'font-semibold text-sm text-white'> {inputUser} </span>
                                        <XIcon onClick = { () => deleteInputUser(inputUser)} className = 'w-4 h-4 cursor-pointer text-white' />
                                    </div>
                                ))}
                                <input value = {inputSuggestions} onChange = { (e) => setInputSuggestions(e.target.value)} className = 'flex-1 border-none bg-transparent focus:ring-transparent' type = 'text' placeholder = 'Search' />
                            </div>
                            <div className = 'flex flex-col gap-3 h-3/4 sm:h-auto md:h-[27rem] border-b py-2 overflow-auto scrollbar-hide scrollbar-thin'>
                                <div> <span className = 'font-semibold text-md p-4'> Suggested </span> </div>
                                    {suggestions?.filter((suggestionFiltered) => {
                                        if(inputSuggestions == '')
                                        {
                                            return suggestionFiltered;
                                        }

                                        else if(suggestionFiltered.username.toLowerCase().includes(inputSuggestions.toLowerCase()))
                                        {
                                            return suggestionFiltered;
                                        }

                                        else { return; }
                                    })
                                    .map((suggestion, index) => (
                                        <SendSuggestions key = {index} id = {index}  avatar = {suggestion?.avatar} username = {suggestion?.username} name = {suggestion?.name} inputUsers = {inputUsers} setInputUsers = {setInputUsers} />
                                    ))}
                            </div>
                            <div className = 'flex items-center justify-center p-1 md:p-4'>
                                <button className = 'text-center w-full bg-blue-500 text-white p-2  rounded-lg cursor-pointer transition transform duration-500 ease-out' type = 'button'> Send </button>
                            </div>
                        </div>
                    </Fade>
                </div>
            ) : (
                <div className = 'hidden'>

                </div>
            )}
            <div className = 'flex items-center p-5'>
                
                <div className = 'relative w-10 h-10 overflow-hidden'>
                    <Image blurDataURL = 'blur' layout = 'fill' src = {userImg} alt = 'userImage' className = ' rounded-full cursor-pointer p-1 border mr-5 object-cover w-full max-w-full ' />
                </div>
                <p className = 'flex-1 font-700 pl-3'> {nameUser} </p>
                {modalHorizontal ? (
                    <DotsVerticalIcon onClick = {() => setModalHorizontal(!modalHorizontal)}  className = 'h-5 w-5 cursor-pointer transition transform duration-500' />
                ) : (
                    <DotsHorizontalIcon onClick = {() => setModalHorizontal(!modalHorizontal)}  className = 'h-5 w-5 cursor-pointer transition transform duration-500' />
                )}
            </div>

            <div className = 'relative containerImage flex items-center justify-center overflow-hidden transition-all'>
            {
                img ? (
                    <LazyLoadImage src = {img}  className = 'block max-h-full max-w-full mx-auto align-middle ' />
                ) : (
                    <div className = 'flex items-center justify-center h-full'>
                        <img className = 'w-12 h-12 md:w-32 md:h-32' src = 'https://i.ibb.co/f98Txpm/Flowing-gradient.gif"' />
                    </div>
                )
            }
                <div className = {`${savedPost ? 'absolute bottom-0 w-full bg-white py-4 px-2 md:px-4 border-b-2 border-opacity-40' : 'hidden'}`}>
                    <div className = 'flex items-center justify-between'>
                        <span className = 'text-black font-semibold text-sm  text-center'> Your item has been saved </span>
                        <span onClick = {routeSavedPosts} className = 'text-blue-500 font-semibold hover:text-blue-700 cursor-pointer text-sm text-center'>View your saved posts</span>
                    </div>
                </div>
            </div>

            <div className = 'relative flex flex-col gap-4'>
                <div className = 'flex justify-between items-center px-4 py-3'>
                    <div className = 'flex items-center space-x-4'>
                        {
                            hasLiked ? (
                                <HeartIconFilled onClick = {likePost} className = 'buttonIcon' />
                            ) : (
                                <HeartIcon onClick = {likePost} className = 'buttonIcon' />
                            )
                        }
                        <ChatIcon onClick = { () => setOpenModalComment(!openModalComment)} className = 'buttonIcon' />
                        <PaperAirplaneIcon onClick = { () => setSendModal(!sendModal)} className = 'buttonIcon rotate-45' />
                    </div>

                    {
                        hasSavedPost ? (
                            <BookmarkIconFilled onClick = {savePost} className = 'buttonIcon' />
                        ) : (
                            <BookmarkIcon onClick = {savePost} className = 'buttonIcon' />
                        )
                    }
                
                </div>

                <div className = 'absolute top-12 px-4'>
                    {!!likes.length && (
                        <span className = 'font-bold text-sm'>
                            {likes.length < 2 ? likes.length + ' like ' : ''}
                            {' '}
                            {likes.length >= 2 ? likes.length + ' likes ' : ''}
                        </span>
                    )}
                </div>

                <div className = 'flex px-4 py-2'>
                    <span className = 'font-bold mr-1'> {username || usernameFacebook} </span>
                    {truncate ? (
                        caption
                    ) : (
                        caption.length > 200 ? (
                            <Truncate lines={1} ellipsis={<span className = 'cursor-pointer text-gray-500' onClick = { () => setTruncate(!truncate)}>...more</span>}>
                                {caption}
                            </Truncate>
                        ) : ( caption ) 
                    )}
                </div>
            </div>

           <div onClick = { () => setOpenModalComment(true) }>
               {!!comments.length && (
                    <span className = 'text-gray-500 cursor-pointer px-4'> 
                        View {comments.length > 1 ? 'all' : ''} {comments.length} {''}
                        {comments.length > 1 ? 'comments' : 'comment'}
                    </span>
               )}
           </div>

            {comments.length > 0 && (
                <div className = 'py-2 overflow-y-hidden h-24 md:h-24'>
                    {comments.map((comment) => (
                        <Comment idPost = {id} key = {comment.id} id = {comment.id} image = {comment.data().userImage} username = {comment.data().userName} comment = {comment.data().comment}   />
                    ))}
                </div>
            )}

            <span className = 'ml-4 text-sm text-gray-400'> <Moment fromNow date = {timestampPost} /></span>

            {/* input below */}

           <div className = 'relative border-t mt-2'>
                <form onSubmit = {sendComment} className = 'flex items-center p-4'>
                    {emojiSelected ? (
                        <EmojiHappyIcon onClick = { () => setEmojiSelected(!emojiSelected)} className = 'h-7 w-7 cursor-pointer text-yellow-300' />
                    ) : (
                        <EmojiHappyIcon onClick = { () => setEmojiSelected(!emojiSelected)} className = 'h-7 w-7 cursor-pointer text-gray-500' />
                    )}
                    <input  className = 'bg-transparent border-none flex-1 focus:ring-0 outline-none' placeholder = 'Add a comment...' type="text" value = {input} onChange = {(e) => setInput(e.target.value)} />
                    <button disabled = {!input} onClick = {sendComment} type = 'button' className = {`${input ? 'text-blue-600 font-bold' : 'text-blue-300 font-500 pointer-events-none'}`}> Post </button>
                </form>
                {
                    emojiSelected ? (
                        <Picker onSelect = {emojiSelect} theme = 'dark' style={{ position: 'absolute', bottom: '4.5rem', left: '0' }} /> 
                    ) : (
                        <div className = 'hidden'></div>
                    )
                }
                {openModalComment ? (
                    <div className = 'fixed inset-0 flex  justify-center  transition duration-1000 ease-in-out z-50 p-6 bg-black bg-opacity-80' onClick = {closeModal}>
                        <Fade>
                            <div className = 'relative imageComment flex overflow-hidden'>
                                <div className = 'relative h-1/2 md:h-full'>
                                    <div onClick = { () => setOpenModalComment(false)} className = 'absolute top-6 left-6 w-12 h-12  rounded-full flex items-center justify-center border border-black border-opacity-30'>
                                        <ChevronLeftIcon className = 'w-7 h-7 text-gray text-opacity-50 cursor-pointer' />
                                    </div>
                                    <img src = {img}  className = 'block max-h-full max-w-full h-full mx-auto align-middle ' />
                                    <div className = {`${savedPost ? 'absolute bottom-0 w-full bg-white py-4 px-2 md:px-4 border-b-2 border-opacity-40' : 'hidden'}`}>
                                        <div className = 'flex items-center justify-between'>
                                            <span className = 'text-black font-semibold text-sm  text-center'> Your item has been saved </span>
                                            <span onClick = {routeSavedPosts} className = 'text-blue-500 font-semibold hover:text-blue-700 cursor-pointer text-sm text-center'>View your saved posts</span>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'flex flex-col w-full md:w-96 bg-gradient-to-r from-bg-pink-50 to-bg-red-50 overflow-hidden'>
                                    <div className = 'flex items-center border-b-2 pb-3 p-4 cursor-pointer'>
                                        <img className = 'h-10 w-10 rounded-full cursor-pointer mr-3' src = {user?.photo || userFacebook?.photo} alt = 'userImage' />
                                        <BadgeCheckIcon className = 'w-4 h-4 text-blue-500' />
                                        <span className = 'font-semibold flex-1 pl-3'> {username || usernameFacebook} </span>
                                        <DotsHorizontalIcon className = 'w-5 h-5 mr-auto' />
                                    </div>
                                    <div className = 'flex flex-col  h-[10rem] md:h-[43rem]  p-4 overflow-hidden overflow-y-scroll scrollbar-thin border-b-2'>
                                        <div className = 'flex items-center'>
                                            <img src = {user?.photo || userFacebook?.photo} className = 'h-10 w-10 rounded-full' alt = 'userAvatar' />
                                            <div className = 'flex flex-wrap overflow-hidden'>
                                                <BadgeCheckIcon className = 'w-4  ml-3 text-blue-500' />
                                                <span className = 'font-semibold pl-4 text-sm'> {username || usernameFacebook} </span>
                                                <span className = 'pl-3 text-sm'>{caption}</span>
                                            </div>
                                        </div>
                                        <div className = 'my-4'>
                                            {comments.map((comment,index) => (
                                                <div key = {index} className = 'flex items-start py-4 cursor-pointer overflow-hidden'>
                                                    <img className = 'h-10 w-10 rounded-full' src = {comment.data().userImage} alt = 'userImage' />
                                                    <div className = 'flex flex-col flex-wrap overflow-hidden px-4'>
                                                        <div className = 'inline-block'>
                                                            <span className = 'font-semibold text-sm'> {comment.data().userName} </span>
                                                            <span className = 'text-sm'> {comment.data().comment} </span>
                                                        </div>
                                                        <div className = 'flex item-center space-x-2 mt-2'>
                                                            <span className = 'text-sm text-gray-500'> <Moment fromNow date = {new Date(comment.data().timestamp?.toDate()).toUTCString()}/> </span>
                                                            <span className = 'text-sm text-gray-500'> 1 like </span>
                                                            <span className = 'text-sm text-gray-500'> Reply </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className = 'hidden md:flex relative flex-col border-b-2'>
                                        <div className = 'relative flex flex-col gap-10 p-3'>
                                            <div className = 'flex items-center justify-between'>
                                                <div className = 'flex items-center space-x-4'>
                                                    {
                                                        hasLiked ? (
                                                            <HeartIconFilled onClick = {likePost} className = 'buttonIcon' />
                                                        ) : (
                                                            <HeartIcon onClick = {likePost} className = 'buttonIcon' />
                                                        )
                                                    }
                                                    <ChatIcon className = 'navButton' />
                                                    <PaperAirplaneIcon className = 'navButton rotate-45' />
                                                </div>
                                                {
                                                    hasSavedPost ? (
                                                        <BookmarkIconFilled onClick = {savePost} className = 'buttonIcon' />
                                                    ) : (
                                                        <BookmarkIcon onClick = {savePost} className = 'buttonIcon' />
                                                    )
                                                } 
                                            </div>
                                            <div> 
                                                <p className = 'text-sm text-gray-400'> <Moment fromNow date = {timestampPost} /></p> 
                                            </div>
                                            <div className = 'absolute top-12'>
                                                <p className = 'font-semibold'>
                                                    {!!likes.length && (
                                                        <>
                                                            {likes.length < 2 ? likes.length + ' like ' : ''}
                                                            {' '}
                                                            {likes.length >= 2 ? likes.length + ' likes ' : ''}
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={sendComment} className = 'flex items-center md:py-2 px-4 py-2 border-t'>
                                        {emojiSelected ? (
                                            <EmojiHappyIcon onClick = { () => setEmojiSelected(!emojiSelected)} className = 'h-7 w-7 cursor-pointer text-yellow-300' />
                                        ) : (
                                            <EmojiHappyIcon onClick = { () => setEmojiSelected(!emojiSelected)} className = 'h-7 w-7 cursor-pointer text-gray-500' />
                                        )}
                                        <input value = {input} onChange = { (e) => setInput(e.target.value)} className = 'flex-1 apperance-none bg-transparent border-none focus:ring-transparent' type = 'text' placeholder = 'Type in here...' />
                                        <button disabled = {!input} onClick = {sendComment} type = 'button' className = {`${input ? 'text-blue-600 font-bold' : 'text-blue-300 font-500 pointer-events-none'}`}> Post </button>
                                    </form>
                                    {emojiSelected ? (
                                        <Picker onSelect = {emojiSelect} theme = 'dark' style={{ position: 'absolute', bottom: '7rem', left: '0', zIndex: '1000' }} /> 
                                        ) : (
                                            <div className = 'hidden'></div>
                                        )
                                    }
                                </div>
                            </div>
                        </Fade>
                    </div>
                ) : (
                    <div className = 'hidden'></div>
                )}
           </div>
        </div>
    )
}

export default Post
