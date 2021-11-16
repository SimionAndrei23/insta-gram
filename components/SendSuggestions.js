
import { useState } from "react";

const SendSuggestions = ( {id,avatar,username,name, inputUsers, setInputUsers}) => {

    const [inputChecked, setInputChecked] = useState(false)

    const handleChecked = () => {

        setInputChecked(!inputChecked)
    }

    const handleInput = (name) => {

        if(!inputChecked)
        {
            setInputUsers(oldArray => [...oldArray, name])
        }

        else
        {
            setInputUsers(inputUsers.filter(item => item !== name))
        }

    }

    return (
        <div onClick = { () => handleInput(name) } key = {id} className = 'flex items-center gap-2 cursor-pointer px-4 py-[2px] transition transform duration-700 hover:bg-gray-100 hover:bg-opacity-50'>
        <div className = 'relative w-12 h-12 cursor-pointer rounded-full overflow-hidden'>
            <img src = {avatar} clasName = 'absolute w-full h-full' alt = 'userAvatar' />
        </div>
        <div className = 'flex flex-col flex-1 justify-center'>
            <span className = 'font-semibold text-sm'> {username} </span>
            <span className = 'text-sm text-black text-opacity-50'> {name} </span>
        </div>
        <input checked = {inputChecked} onChange = {handleChecked} type = 'checkbox' />
    </div>
    )
}

export default SendSuggestions
