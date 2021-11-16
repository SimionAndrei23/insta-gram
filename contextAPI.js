import { onAuthStateChanged } from '@firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from './firebase'

const ResultContext = createContext()

export const ResultContextProvider = ({ children }) => {

    const router = useRouter()

    const [userProfile, setUserProfile] = useState('')

    const data = 2


    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
          if(user) {
            router.push('/')
            setUserProfile({
                name: user.displayName,
                photo: user.photoURL,
              })
              localStorage.setItem('user', JSON.stringify(userProfile))
          }
          else {
           router.push('/login')
          }
        })
    },[])

    return (
        <ResultContext.Provider value = {{data}}>
            { children }
        </ResultContext.Provider>
    )

}

export const useResultContext = () => useContext(ResultContext)