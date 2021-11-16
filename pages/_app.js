import '../styles//globals.css'
import '../styles//body.css'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import React from 'react'
import { Context } from '../Context'
import { useEffect, useState } from 'react'
import { onAuthStateChanged,signInWithPopup,signOut } from '@firebase/auth';
import { auth, provider } from '../firebase';
import router from 'next/router';


const progressBar = new ProgressBar({
  size: 4,
  color: '#F08080',
  className: 'z-50',
  delay: 50,

})

Router.events.on('routeChangeStart', progressBar.start)
Router.events.on('routeChangeComplete', progressBar.finish)
Router.events.on('routeChangeError', progressBar.finish)

// Connect the progressBar to next Router

function MyApp({ Component, ...pageProps }) {


const [modalOne, setModalOne] = useState(false)

const [modalHorizontal, setModalHorizontal] = useState(false)


const [user, setUser] = useState('')

const [userFacebook, setUserFacebook] = useState('')

let usernameModified = Object.assign({}, userFacebook)

let usernameFacebook = usernameModified?.name?.split(' ').join('').toLocaleLowerCase()

const handleFacebook = (data) => {
    if(data) {
      router.push('/')
      setUserFacebook({
        name: data.profile.name,
        photo: data.profile.picture.data.url,
        uid: data.profile.id
      })
      if(typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('user', JSON.stringify(userFacebook))
      }
      
    }
    else {
      setUserFacebook(null)
      router.push('/login')
    }
  }

let nameModified = Object.assign({}, user)

let username = nameModified?.name?.split(' ').join('').toLocaleLowerCase()


useEffect(() => {
  return onAuthStateChanged(auth, (user) => {
      if(user) {
        router.push('/')
          setUser({
              name: user.displayName,
              photo: user.photoURL,
              uid: user.uid
            })
            if(typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('user', JSON.stringify(user))
            }
        }
        else {
            setUser(null)
            router.push('/login')
        }
  })
},[])

const signInUser =  () => {

  signInWithPopup(auth,provider)

}

const signOutUser = () => {

  signOut(auth)

  setUserFacebook(null)

  router.push('/login')

  localStorage.clear()
}


  return (
    <Context.Provider 
    value = {{user,username,signInUser,signOutUser, modalOne, setModalOne, handleFacebook, userFacebook, usernameFacebook, modalHorizontal, setModalHorizontal}}>

      <Component {...pageProps} />

    </Context.Provider>
  )
}

export default MyApp
