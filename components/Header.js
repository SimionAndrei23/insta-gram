import React, {useContext, useEffect,useState} from 'react'
import {SearchIcon,BookmarkIcon, PlusCircleIcon, CogIcon, SwitchHorizontalIcon, XIcon, UserCircleIcon, UseGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon, UserGroupIcon, ChevronRightIcon, RefreshIcon, HomeIcon, VideoCameraIcon, CameraIcon} from '@heroicons/react/outline'
import {HeartIcon as HeartIconSolid} from '@heroicons/react/solid'
import {VideoCameraIcon as VideoCameraIconSolid} from '@heroicons/react/solid'
import { data } from './dataHeader'
import faker from 'faker'
import { useRouter } from 'next/router'
import Fade from 'react-reveal/Fade'
import { db, storage,auth } from '../firebase'
import { collection, onSnapshot, query} from '@firebase/firestore'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Reels from './Reels'
import { Context } from '../Context'

const Header = ({dataValue,icon, name }) => {
    
    const { user, signOutUser, modalOne, setModalOne, userFacebook } = useContext(Context)

    const router = useRouter()

    const [reelsData, setReelsData] = useState([])


    useEffect(() => {
        onSnapshot(query(collection(db,'reels')), snapshot => {
            setReelsData(snapshot.docs);
        })
    },[db])

    const [reelsModal, setReelsModal] = useState(false)

    /*useEffect(() => {
        if(reelsModal) {
            document.body.style.overflow = 'hidden'
        }
        else
        {
            document.body.style.overflow = 'auto'
        }
    }, [reelsModal])*/
    
    

    const [menuModal, setMenuModal] = useState(false)

    const [modalHeart, setModalHeart] = useState(false)

    const [loadingHeart, setLoadingHeart] = useState(false)

    useEffect(() => {
        setLoadingHeart(true)
        setTimeout(() => {
            setLoadingHeart(false)
        }, 1000)
    }, [modalHeart])

    const [inputSuggestions, setInputSuggestions] = useState([]);

    const [headerContainer, setHeaderContainer] = useState(false);

    const [inputRef, setInputRef] = useState('');

    const [inputFocus, setInputFocus] = useState(false);

    const [loadingInput, setLoadingInput] = useState(false);

    useEffect(() => {
        setLoadingInput(true)
        setTimeout(() => {
            setLoadingInput(false)
        }, 1000)
    }, [inputRef,inputFocus])

    const [activeTab, setActiveTab] = useState(icon);

    const [borderUser, setBorderUser] = useState(false);

    const changeUser = () => {

        setHeaderContainer(!headerContainer);

        setBorderUser(!borderUser)
    }

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));

        setInputSuggestions(suggestions)

    },[])


    const sendRoutes = () => {

        if(activeTab == 'Home')
        {
            router.push('/')
        }

    
        if(activeTab == 'Send') {

            router.push('/component/send')
        }

    }

    const deleteHandler = (user) => {

        setInputSuggestions(inputSuggestions.filter((element) => element.id !== user.id))

    }

    const closeModal = (e) => {

        console.log(e.target);

    }

    const userData = (name, username,avatar) => {

        router.push({
            pathname: '/component/userData',
            query: {
                name: name,
                username: username,
                avatar: avatar
            }
        })

    }

    const closeModalHeader = (e) => {

        if(e.target.classList.contains('fixed')) {

            setReelsModal(false)
        }

    }


    return (
        <div className = 'sticky w-full inset-0 h-18 z-40 shadow-xl border-b py-1 headerColor'>
            <div className = 'belowHeader absolute -bottom-3 left-0 w-full h-4 '></div>
           <div className = 'flex items-center justify-between max-w-6xl px-5 md:mx-auto'>

                {/* Left */}

                <div className = 'relative w-24 mt-2 hidden md:inline-grid cursor-pointer' onClick = { () => router.push('/')}>
                    <LazyLoadImage className = 'w-full h-full object-cover' src  = 'https://i.ibb.co/2SCrBJD/instagram-text-removebg-preview.png' alt = 'InstagramLogo'/>
                </div>

                <div className = 'relative w-8 mt-2 md:hidden flex-shrink-0 cursor-pointer' onClick = { () => router.push('/')}>
                    <LazyLoadImage className = 'w-full h-full object-cover' src  = 'https://i.ibb.co/NTKWQLC/logo-instacheck-removebg-preview.png' alt = 'InstagramLogo'/>
                </div>

                {/* Middle - Search input field  */}

               <div className = 'relative  ml-5 flex-1 md:w-2/5 md:flex-none'>
                    <div className = 'relative mt-1 p-3 rounded-md '>
                        <div className = 'absolute top-5 left-6 flex items-center pointer-events-none'>
                            <SearchIcon className = 'h-7 w-4 md:h-7 md:w-5  text-gray-500' />
                        </div>
                        <input  value = {inputRef} onChange = { (e) => setInputRef(e.target.value)} onFocus = { () => setInputFocus(!inputFocus)}  type="text" placeholder = {`${ name ? name : 'Search'}`} className = 'inputRef bg-gray-50 border-gray-300 block w-full pl-10 rounded-md focus:ring-transparent focus:border-black sm:text-sm' />
                        { inputRef ? <XIcon className = 'absolute top-6 right-8 text-gray-400  h-4 w-4 ml-3 cursor-pointer' onClick = { () => setInputRef('')} /> : null}
                        { inputFocus ? <XIcon className = 'absolute top-6 right-8 text-gray-400  h-4 w-4 ml-3 cursor-pointer' /> : null}
                    </div>
                    
                    <div className = {`${(inputFocus || inputRef) ? 'absolute top-[4.5rem]  -inset-x-12   md:inset-x-12 w-72 md:w-80 h-50 bg-gradient-to-r from-pink-100 to-purple-100 shadow-lg border rounded-md' : 'hidden'}`} onClick = { (e) => closeModal(e)}>
                        <div className = 'absolute -top-2 left-32 md:left-40 z-10 w-4 h-4  rotate-45 bg-gradient-to-r from-pink-100 to-purple-100'></div>
                        <div className = 'flex flex-col py-4 h-96  scrollbar-thin'>
                           {
                               loadingInput ? (
                                    <div className = 'flex items-center justify-center w-full h-full'>
                                        <RefreshIcon className = 'animate-spin w-8 h-8 text-black text-opacity-50' />
                                    </div>
                               ) : (
                                   <div>
                                       <div className = 'flex flex-items justify-between px-4'>
                                            <span className = 'font-semibold'> Recent </span>
                                            <span className = 'text-blue-500 font-semibold cursor-pointer' onClick = { () => setInputSuggestions([])}> Clear all </span>
                                       </div>
                                       {inputSuggestions.filter((inputUser) => {
                                           if(inputRef == '') {
                                                return inputUser
                                           }
                                           else if(inputUser.username.toLowerCase().includes(inputRef.toLowerCase())) {
                                                return inputUser
                                           }
                                           else { return }
                                       }).map((user,index) => (
                                           <div onClick = { () => userData(user.username, user.name, user.avatar)} key = {index} className = 'flex items-center px-3 mt-2 py-1 cursor-pointer transition transform duration-500 ease-out hover:bg-gray-100'>
                                                <img className = 'h-12 w-12 rounded-full' src = {user.avatar} alt = 'userImage' />
                                                <div className = 'flex flex-col ml-4 flex-1'>
                                                    <span className = 'text-sm font-semibold'> {user.username} </span>
                                                    <span className = 'text-smtext-gray-500'> {user.name} </span>
                                                </div>
                                                <XIcon className = 'h-5 w-5 text-gray-500 cursor-pointer' onClick = { () => deleteHandler(user)} />
                                           </div>
                                       ))}
                                   </div>
                               )
                           }
                        </div>
                    </div>
               </div>

                {/* Right */}

                <div className = 'relative flex items-center space-x-6'>

                        <div className = {`${modalHeart ? 'absolute top-14 -left-60 md:-left-40 w-80 h-80 md:w-96 md:h-96 bg-white rounded-md shadow-lg' : 'hidden'}`}>
                            <div className = 'hidden md:inline-flex absolute -top-2 right-[4.5rem] w-4 h-4 rotate-45 bg-white'></div>
                            {
                                loadingHeart ? (
                                    <div className = 'flex items-center justify-center w-full h-full'>
                                        <RefreshIcon className = 'animate-spin text-black text-opacity-50 w-8 h-8' /> 
                                    </div>
                                ) : (
                                    <div className = 'relative flex items-center gap-4 px-6 py-4 cursor-pointer transition duration-700 ease-out hover:bg-gray-100'>
                                <div className = 'z-50 w-8 h-8 rounded-full bg-red-500 overflow-hidden'>
                                
                                </div>
                                <div className = 'absolute top-3 left-3 w-8 h-8 bg-blue-500 rounded-full overflow-hidden'> </div>
                                <div className = 'flex flex-col justify-center flex-1'>
                                    <span className = 'font-semibold text-sm'> Follow Requests </span>
                                    <span className = 'text-black text-opacity-40 text-sm'> razvanpopescu + 2 more </span>
                                </div>
                                <div className = 'flex items-center gap-4'>
                                    <span className = 'w-2 h-2 bg-blue-500 rounded-full'></span>
                                    <ChevronRightIcon className = 'text-black text-opacity-40 w-4 h-4'/>
                                </div>
                            </div>
                                )
                            }
                        </div>
                        

                    <div className = 'hidden md:inline-flex items-center gap-6'>
                        {data.map((icon,index) => (
                            <div onClick = {() => setActiveTab(icon.name)} key = {index}>
                                <span className = {`navButton ${icon.name === 'Send' ? 'rotate-45' : ''} ${icon.name !== 'Send' ? 'mt-1.5' : ''}`} onClick = {sendRoutes}> {activeTab === icon.name ? icon.inactive : icon.active} </span>
                            </div>
                        ))}
                        {
                            modalHeart ? (
                                <HeartIconSolid onClick = { () =>  setModalHeart(!modalHeart)} className = 'navButton' />
                            ) : (
                                <HeartIcon onClick = { () =>  setModalHeart(!modalHeart)} className = 'navButton' />
                            )
                        }
                        <VideoCameraIcon onClick = { () => setReelsModal(!reelsModal)} className = 'navButton' />
                        <PlusCircleIcon onClick = { () => setModalOne(!modalOne)}  className = 'navButton' />
                    </div>

                    { menuModal ? (
                        <XIcon onClick = { () => setMenuModal(!menuModal)} className = 'h-7 inline-flex md:hidden cursor-pointer transform transition duration-1000 ease-out' />
                    ) : (
                        <MenuIcon onClick = { () => setMenuModal(!menuModal)} className = 'h-7 inline-flex md:hidden cursor-pointer transform transition duration-1000 ease-out' />
                    )}

                    <div className = {`${menuModal ? 'absolute top-12 -left-60 w-72 bg-white rounded-md shadow-lg' : 'hidden'}`}>
                        <div className = 'inline-flex md:hidden absolute -top-2 right-6 w-4 h-4 rotate-45 bg-white'></div>
                        <div className = 'flex flex-col justify-center md:hidden'>
                            {data.map((icon,index) => (
                                <div className = 'flex items-center gap-4 p-4 transition duration-700 ease-out hover:bg-gray-100 cursor-pointer' onClick = {() => setActiveTab(icon.name)} key = {index}>
                                    <span className = {`w-6 h-6 ${icon.name === 'Send' ? 'rotate-45' : ''}`} onClick = {sendRoutes}> {activeTab === icon.name ? icon.inactive : icon.active} </span>
                                    <span className = {`${icon.name === 'Send' ? 'pt-2' : ''}`}> {icon.name} </span>
                                </div>
                            ))}

                            <div  onClick = { () =>  setModalHeart(!modalHeart)}  className = 'flex items-center gap-4 p-4 transition duration-700 ease-out hover:bg-gray-100 cursor-pointer'>
                                {
                                    modalHeart ? (
                                        <HeartIconSolid  className = 'h-6 w-6' />
                                    ) : (
                                        <HeartIcon className = 'h-6 w-6' />
                                    )
                                }
                                <span> Likes </span>
                            </div>

                            <div onClick = { () => setReelsModal(!reelsModal)} className = 'flex items-center gap-4 p-4 transition duration-700 ease-out hover:bg-gray-100 cursor-pointer'>
                                {
                                    reelsModal ? (
                                        <VideoCameraIconSolid  className = 'h-6 w-6' />
                                    ) : (
                                        <VideoCameraIcon className = 'h-6 w-6' />
                                    )
                                }
                                <span> Reels </span>
                            </div>
                    
                            <div onClick = { () => setModalOne(!modalOne)} className = 'flex items-center gap-4 p-4 transition duration-700 ease-out hover:bg-gray-100 cursor-pointer'>
                                <PlusCircleIcon className = 'h-6 w-6'/>
                                <span> Add post </span>
                            </div>
                        </div>
                    </div>

                    { user || userFacebook ? (
                        <div className = 'relative w-8 h-8' onClick = {changeUser}>                                                                                                                                                                                    
                            <LazyLoadImage src = {user?.photo || userFacebook?.photo}  alt = 'profile pic' className = {`${borderUser ? 'rounded-full cursor-pointer border  p-[1px] object-cover' : 'rounded-full cursor-pointer border'}`} />
                        </div>
                    ) : (
                        <div className = 'relative w-8 h-8' onClick = {changeUser}>
                           <LazyLoadImage  src = 'https://i.ibb.co/ysJmcnf/placeholder-removebg-preview.png' alt = 'PlaceholderUser' />
                           
                        </div>
                    )}

                    <div className = {`${headerContainer ? 'absolute z-50 top-14 -left-48 md:left-5  rounded-md w-72 h-auto shadow-2xl bg-gradient-to-r from-pink-100 to-white border' : 'hidden'}`}>
                        <div className = 'absolute -top-2 right-5 w-4 h-4 rotate-45 bg-gradient-to-r from-pink-50 to-white'></div>
                        <Fade>
                            <div className = 'flex flex-col'>
                                <div className="flex items-center p-3 cursor-pointer hover:bg-gray-50" onClick = { () => router.push(`/component/profile/${user?.uid || userFacebook?.uid}`)}>
                                    <div className = 'inline-flex transform transition duration-700 hover:translate-x-4'>
                                        <UserCircleIcon className = 'h-5 w-5 mr-3 transform' />
                                        <span className = 'text-sm'> Profile </span>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 cursor-pointer hover:bg-gray-100" onClick = { () => router.push('/component/savedPosts')}>
                                    <div className = 'inline-flex transform transition duration-700 hover:translate-x-4'>
                                        <BookmarkIcon className = 'h-5 w-5 mr-3' />
                                        <span className = 'text-sm'> Saved </span>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 cursor-pointer hover:bg-gray-100">
                                    <div className = 'inline-flex transform transition duration-700 hover:translate-x-4'>
                                        <CogIcon className = 'h-5 w-5 mr-3' />
                                        <span className = 'text-sm'> Settings </span>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 cursor-pointer hover:bg-gray-100">
                                    <div className = 'inline-flex transform transition duration-700 hover:translate-x-4'>
                                        <SwitchHorizontalIcon className = 'h-5 w-5 mr-3' />
                                        <span className = 'text-sm'> Switch </span>
                                    </div>
                                </div>
                                <span className = 'border-b-2 border-opacity-30'></span>
                                <div className="relative flex gap-4 items-center justify-center p-3 cursor-pointer hover:bg-gray-100" onClick = {signOutUser}>
                                    <span className = 'text-sm'> Log Out </span>
                                    <svg class="animate-bounce w-4 h-4 rounded-full bg-gradient-to-l from-red-300 to-purple-200 ..."></svg>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>

                <div onClick = {closeModalHeader} className = {`${reelsModal ? 'fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 transition duration-1000 ease-out' : 'hidden'}`}>
                    <Fade>
                        <div  className = 'reelsContainer bg-white w-[26rem] h-2/3 md:w-[30rem] md:h-2/3 overflow-scroll scroll-snap-y rounded-md shadow-lg mx-4'>
                            {
                                reelsData.map((reelData, index) => (
                                    <Reels setReelsModal = {setReelsModal} key = {index} id = {reelData.id} video = {reelData.data().video} avatar = {reelData.data().avatar} comments = {reelData.data().comments} likes = {reelData.data().likes} song = {reelData.data().song} name = {reelData.data().name} description = {reelData.data().description}   />
                                ))
                            }
                        </div>
                    </Fade>
                </div> 
            </div>
        </div>
    )
}

Header.defaultProps = {
    icon: 'Home'
}

export default Header
