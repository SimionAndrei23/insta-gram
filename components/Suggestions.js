import { useEffect, useState } from "react"
import faker from 'faker'
import { LazyLoadImage } from "react-lazy-load-image-component";

function Suggestions() {

    const [suggestionsData, setSuggestionsData] = useState([]);

    useEffect(() => {

        const suggestions = [...Array(5)].map((_, i) => (
            {
                ...faker.helpers.contextualCard(),
                index: i
            }
         ))

         setSuggestionsData(suggestions);

    },[])

    return (
        <div className = 'ml-10 mt-6'>
            <div className = 'flex justify-between  mb-5'>
                <h3 className = 'text-sm font-semibold text-gray-400'> Suggestions for you </h3>
                <button type = 'button' className = 'text-gray-600 font-semibold'> See All </button>
            </div>

            {suggestionsData.map((profile) => (
               <div key = {profile.id} className = 'flex items-center justify-between mt-3 cursor-pointer'>
                   <LazyLoadImage src = {profile.avatar} alt = 'UserProfile' className = 'w-12 h-12 rounded-full border p-[2px] ' />
                   <div className = 'flex-1 ml-4'>
                       <h2 className = 'font-semibold text-sm'> {profile.username} </h2>
                       <h3 className = 'text-gray-400 text-xs'> Followed by {profile.name} + 7 more </h3>
                   </div>

                   <button type = 'button' className = 'text-blue-400 text-sm transform transition duration-700 hover:translate-x-4 hover:text-blue-600'> Follow </button>
               </div> 
            ))}
        </div>
    )
}

export default Suggestions
