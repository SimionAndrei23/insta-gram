
import Header from '../../components/Header'
import { PaperAirplaneIcon as PaperOutline, ChevronDownIcon, PencilAltIcon } from '@heroicons/react/outline'
import { useContext, useEffect, useState } from 'react'
import faker from 'faker'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Context } from '../../Context'


const send = () => {

    const { username, usernameFacebook} = useContext(Context)


    const icon = 'Send'

    const [messagesSuggestions, setMessagesSuggestions] = useState([])

    useEffect(() => {
        const suggestions = [...Array(50)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }));

        setMessagesSuggestions(suggestions)

    },[])


    return (
        
        <div>
            <Header icon = {icon} />
            <div className = 'content-container w-full mt-20  p-[20px] '>
                <div className = 'h-full w-full overflow-hidden  flex rounded-ms border shadow-lg max-w-3xl md:max-w-5xl md:mx-auto'>
                    <div className = 'w-full md:w-1/3 h-full border-r'>
                        <div className = 'flex items-center justify-between p-4 border-b'>
                            <span classname = 'hidden md:inline-flex'></span>
                            <div className = 'flex items-center gap-2'>
                                <span className = 'font-semibold'> {username || usernameFacebook} </span>
                                <ChevronDownIcon className = 'w-6 h-6 text-black text-opacity-50 cursor-pointer' />
                            </div>
                            <PencilAltIcon className = 'w-8 h-8 tet-black text-opacity-60 cursor-pointer' />
                        </div>
                        <div className = 'overflow-y-auto h-full'>
                            <div className = 'flex items-center justify-between p-4'>
                                <span classname = 'font-semibold text-lg'> Messages </span>
                                <span className = 'text-blue-500 cursor-pointer'> 1 Request </span>
                            </div>
                            <div className = 'flex flex-col gap-2 pb-16'>
                                {messagesSuggestions?.map((message,index) => (
                                    <div key = {index} className = 'flex items-center px-4 py-2 gap-4 transition duration-700 ease-out hover:bg-gray-100 cursor-pointer'>
                                        <div className = 'relative w-16 h-16 overflow-hidden'>
                                            <LazyLoadImage src = {message.avatar} className = 'absolute w-full h-full rounded-full object-cover cursor-pointer' />
                                        </div>
                                        <div className = 'flex flex-col'>
                                            <span classname = 'font-semibold text-md'> {message.username} </span>
                                            <span className = 'text-black text-opacity-40 text-sm'> {message.name} </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className = 'flex items-center justify-center w-full h-full py-10 md:w-2/3'>
                        <div className = 'flex items-center justify-center'>
                            <div className = 'flex flex-col items-center gap-4 px-4'>
                                <div className = ' flex items-center justify-center w-32 h-32 rounded-full border border-black bg-opacity-40'>
                                    <PaperOutline className = 'w-16 h-16 rotate-45' />
                                </div>
                                <div className = 'flex flex-col items-center gap-2'>
                                    <h1 className = 'text-2xl text-center'> Your Messages </h1>
                                    <span className = 'text-black text-opacity-60 text-sm text-center'> Send private photos and messages to a friend or group. </span>
                                </div>
                                <a href = '#' className = 'mt-4 p-2 bg-blue-500 text-white text-sm rounded-md cursor-pointer'>
                                    Send Message
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default send
