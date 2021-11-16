
import router, { useRouter } from 'next/router'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useContext } from 'react';
import { Context } from '../Context';

function Profile() {

    const { user, userFacebook, signOutUser } = useContext(Context)

    return (
        <div className = 'flex items-center justify-between mt-16 ml-10 '>
            <div className = 'relative w-16 h-16' onClick = { () => router.push(`/component/profile/${user?.uid || userFacebook?.uid}`)}>
                {user || userFacebook ? (
                    <LazyLoadImage effect = 'opacity'  className = 'rounded-full border p-[2px] cursor-pointer' src = {user?.photo || userFacebook?.photo} alt = 'userImage' />
                ) : (
                    <LazyLoadImage effect = 'opacity'  className = 'rounded-full border p-[2px] cursor-pointer' src = 'https://i.ibb.co/ysJmcnf/placeholder-removebg-preview.png' alt = 'userImage' />
                )}
            </div>
            <div className = 'flex-1 mx-4'>
                <h2 className = 'font-semibold'> {user?.name || userFacebook?.name} </h2>
                <h3 className = 'text-sm text-gray-400'> Welcome to Instagram! </h3>
            </div>

            <button type = 'button' className = 'ml-12 text-sm text-blue-400 hover:text-blue-600' onClick = {signOutUser}> Sign Out </button>
        </div>
    )
}

export default Profile
