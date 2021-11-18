import { useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Context } from '../Context'
import FacebookLogin from 'react-facebook-login';
import { auth } from '../firebase';
import router from 'next/router';
import { FacebookProvider, LoginButton } from 'react-facebook';


const login = () => {

    const { signInUser, handleFacebook} = useContext(Context)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user) {
                router.push('/')
            }
        })
    },[])

    return (
        <div className = 'relative grid place-items-center h-screen bg-gradient-to-r from-red-200 via-purple-100 to-pink-100'>
          <div className = 'absolute inset-0 w-full h-full clipPath3 z-10'></div>
          <div className = ' grid grid-cols-1 md:grid-cols-2 px-4 max-w-3xl md:max-w-6xl md:mx-auto lg:mx-auto  overflow-hidden z-20'>
                <div className = 'hidden md:inline-flex items-center'>
                    <img className = 'w-full object-cover' src = 'https://vulping.ro/wp-content/uploads/2021/06/descrieri-in-trend.png' alt = 'InstagramImageIntro' />
                </div>
                <div className = 'flex items-center justify-center'>
                        <div className = 'relative coloredBorder shadow-xl rounded-md p-16 w-96 flex flex-col justify-center items-center cursor-pointer bg-gray-50 hover:coloredBorderReversed z-20'>
                            <div className = 'w-40'>
                                <img className = 'w-full object-contain cursor-pointer' src = 'https://i.ibb.co/m4mRG9T/logo-insta-removebg-preview.png' alt = 'InstagramLogo' />
                            </div>
                            <div className = 'w-40 pb-6 mt-4'>
                                <img src = 'https://i.ibb.co/ysJmcnf/placeholder-removebg-preview.png' />
                            </div>
                            <div>
                                <button onClick = {signInUser}  className = 'flex-1 w-56 mt-4 py-2  flex items-center justify-evenly  bg-red-400 rounded-full text-white cursor-pointer hover:scale-105 transition-all transform duration-500 ease-out' type = 'button'>
                                    Login with Google
                                    <img src = 'https://i.ibb.co/vdXDfFj/google-logo-removebg-preview.png' className = 'w-6 h-6 object-cover' alt = 'GoogleLogo' />
                                </button>
                                <FacebookProvider appId="611691100256572">
                                            <LoginButton
                                            className = 'flex-1 w-56 mt-4 py-2 flex items-center justify-evenly   bg-blue-400 rounded-full text-white cursor-pointer hover:scale-105 transition-all transform duration-500 ease-out'
                                                scope="email"
                                                onCompleted={handleFacebook}
                                            >
                                            <div className = 'flex items-center gap-4'>
                                                <span className = 'text-white'>Login with Facebook</span>
                                                <img src = 'https://i.ibb.co/vvm26C4/facebook.png' className = 'w-6 h-6 object-cover' alt = 'FacebookLogo' />
                                            </div>
                                        </LoginButton>
                                </FacebookProvider>
                            </div>
                        </div>
                </div>
          </div>
      </div>
    )
}

export default login
