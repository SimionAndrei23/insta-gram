import { useRouter } from "next/router"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Header from "../../components/Header"
import { UserIcon, CheckIcon, ChevronDownIcon, DotsHorizontalIcon, BadgeCheckIcon } from '@heroicons/react/solid';
import NumberFormat from 'react-number-format'
import { useContext } from "react";
import { Context } from "../../Context";

const userData = () => {

    const { user } = useContext(Context)

    const router = useRouter()

    const {name, username, avatar} = router.query

    const valuePosts = 3700
    const valueFollowers = 1000000
    const valueFollowing = 1080


    return (
        <div>
            <Header name = {name} />
            <div className = 'max-w-3xl mt-10 md:max-w-4xl md:mx-auto px-4 '>
            <div className = 'flex flex-col gap-8 md:gap-20'>
                <div className = 'flex items-start gap-10 md:gap-20'>
                    <div className = 'relative w-28 h-28 md:w-40 md:h-40'>
                        <LazyLoadImage src = {avatar} className = 'absolute top-0 left-0 w-full h-full rounded-full p-2 border cursor-pointer object-cover' />
                    </div>
                    <div className = 'flex flex-col justify-center gap-8'>
                        <div className = 'flex items-center gap-2 md:gap-4'>
                            <div className = 'flex items-center gap-2 mr-5'>
                                <span className = ' text-2xl  text-black text-opacity-70'> {name} </span>
                                <BadgeCheckIcon className = 'text-blue-500  w-6 h-6' />
                            </div>
                            <div className = 'flex md:hidden py-1 px-2 cursor-pointer'>
                                <DotsHorizontalIcon className = 'text-center font-semibold text-black w-6 h-6' />
                            </div>
                            <div className = 'hidden md:inline-flex items-center gap-4'>
                                <div className = 'py-1 px-2 border rounded-sm cursor-pointer'>
                                    <span className = 'text-sm font-semibold text-center'> Message </span>
                                </div>
                                <div className = 'flex items-center justify-center border rounded-sm py-1 px-5 cursor-pointer'>
                                    <UserIcon className = 'h-6 w-6' />
                                    <CheckIcon className = 'h-5 w-5 text-black text-opacity-40' />
                                </div>
                                <div className = 'py-2 px-2 border rounded-sm cursor-pointer'>
                                    <ChevronDownIcon className = 'w-4 h-4 text-black text-opacity-40' />
                                </div>
                                <div className = 'py-1 px-2 cursor-pointer'>
                                    <DotsHorizontalIcon className = 'text-center font-semibold text-black w-6 h-6' />
                                </div>
                            </div>
                        </div>
                        <div className = 'flex md:hidden items-center gap-4'>
                                <div className = 'py-1 px-2 border rounded-sm cursor-pointer'>
                                    <span className = 'text-sm font-semibold text-center flex-1 px-8'> Message </span>
                                </div>
                                <div className = 'flex items-center justify-center border rounded-sm py-1 px-5 cursor-pointer'>
                                    <UserIcon className = 'h-6 w-6' />
                                    <CheckIcon className = 'h-5 w-5 text-black text-opacity-40' />
                                </div>
                                <div className = 'py-2 px-2 border rounded-sm cursor-pointer'>
                                    <ChevronDownIcon className = 'w-4 h-4 text-black text-opacity-40' />
                                </div>
                            </div>
                        <div className = 'hidden md:flex items-center justify-between pr-12'>
                            <div className = 'flex items-center gap-2'>
                                    <span className = 'font-semibold text-md'>
                                        <NumberFormat value = {valuePosts} displayType = {'text'} thousandSeparator = {true}></NumberFormat>
                                    </span>
                                <span className = 'text-sm'> posts </span>
                            </div>
                            <div className = 'flex items-center gap-2'>
                                <span className = 'font-semibold text-md'>
                                    <NumberFormat value = {valueFollowers} displayType = {'text'} thousandSeparator = {true}></NumberFormat> 
                                </span>
                                <span className = 'text-sm'> followers </span>
                            </div>
                            <div className = 'flex items-center gap-2'>
                                <span className = 'font-semibold text-md'>
                                    <NumberFormat value = {valueFollowing} displayType = {'text'} thousandSeparator = {true} />
                                </span>
                                <span className = 'text-sm'> following </span>
                            </div>
                        </div>
                        <div className = 'hidden md:flex flex-col gap-1'>
                            <span className = 'font-semibold text-lg'> {username} </span>
                            <span className = 'text-sm text-black text-opacity-50'> Musician / Band </span>
                            <span> 🚀 Welcome to my empire! </span>
                            <span> 🔥 Digital artist! </span>
                            <span> 🎵 We express our feelings through music! </span>
                        </div>
                    </div>
                </div>
                <div className = 'flex md:hidden flex-col gap-1'>
                    <span className = 'font-semibold text-lg'> {username} </span>
                    <span className = 'text-sm text-black text-opacity-50'> Musician / Band </span>
                    <span> 🚀 Welcome to my empire! </span>
                    <span> 🔥 Digital artist! </span>
                    <span> 🎵 We express our feelings through music! </span>
                </div>
            </div>
          </div>
        </div>
    )
}

export default userData
