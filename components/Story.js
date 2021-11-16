import { PlusIcon } from "@heroicons/react/outline"
import { useContext, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Context } from "../Context";

function Story( {img,username}) {

    const { user, userFacebook } = useContext(Context)

    const [userProfile, setUserProfile] = useState(user?.name)

    const [facebookProfile, setFacebookProfile] = useState(userFacebook?.name)

    return (
        <div className = {`${(userProfile == username || facebookProfile === username) ? 'relative mr-6' : ''}`}>
            <LazyLoadImage effect = 'opacity' src = {img} alt = '' className = 'h-14 w-14 rounded-full p-[2px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out' />
            <p className = 'text-center text-xs w-14 truncate'> {username} </p>
            {(userProfile == username || facebookProfile === username) && (
                <span className = 'absolute bottom-5 right-0 flex items-center justify-center w-4 h-4 rounded-full bg-blue-500'>
                    <PlusIcon className = 'w-2 h-2 text-white cursor-pointer' />
                </span>
            )}
        </div>
    )
}

export default Story
