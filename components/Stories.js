import faker from 'faker'
import { useContext, useEffect, useState } from 'react'
import Story from './Story';
import { RefreshIcon } from '@heroicons/react/outline'
import { Context } from '../Context';

function Stories() {

    const { user, userFacebook  } = useContext(Context)

    const [loadingStory, setLoadingStory] = useState(false)

    useEffect(() => {
        setLoadingStory(true)
        setTimeout(() => {
            setLoadingStory(false)
        }, 1000)
    },[])

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));

        setSuggestions(suggestions)

        return suggestions;

    },[])

    return (
        <div className = 'flex flex-col space-x-2 p-6 mt-10 bg-white border border-gray-200  rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-red-200 shadow-md'>
            {
                loadingStory ? (
                <div className = 'flex items-center justify-center '>
                    <RefreshIcon className = 'animate-spin w-8 h-8 text-black text-opacity-50' />
                </div>
                ) : (
                <div className = 'flex items-center gap-2'>
                    {user && (
                        <Story img = {user.photo} username = {user.name} />
                    )}
                    {userFacebook && (
                        <Story img = {userFacebook.photo} username = {userFacebook.name} />
                    )}
                    {suggestions.map(profile => (
                        <Story key = {profile.id} img = {profile.avatar} username = {profile.username}  />  
                    ))}
                </div>
                )
            }
        </div>
    )
}

export default Stories
