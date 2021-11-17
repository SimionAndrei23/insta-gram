import { collection, onSnapshot, query, where } from "@firebase/firestore"
import { ChatIcon, HeartIcon } from "@heroicons/react/outline"
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/opacity.css';

const PostsProfile = ( {id, img}) => {

    const [stateHover, setStateHover] = useState(false)

    return (
        <div key = {id} onMouseEnter = { () => setStateHover(true)} onMouseLeave = { () => setStateHover(false)}  className = 'relative md:w-72 md:h-80 h-36 w-32 cursor-pointer'>
            <LazyLoadImage effect = 'opacty' src = {img} className = 'absolute inset-0 w-full h-full object-cover' />
            {stateHover && (
                <div className = 'absolute top-0 z-20 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40'>
                    <div className = 'flex items-center gap-5'>
                        <div className = 'flex items-center gap-1'>
                            <HeartIcon className = 'w-6 h-6 cursor-pointer text-white' />
                            <span className = 'text-sm text-white font-semibold'> 100 </span>
                        </div>
                        <div className = 'flex items-center gap-1'>
                            <ChatIcon className = 'w-6 h-6 cursor-pointer text-white' />
                            <span className = 'text-sm text-white font-semibold'> 20 </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostsProfile
