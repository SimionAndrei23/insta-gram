import { useEffect, useState } from "react"
import Posts from "./Posts"
import Profile from "./Profile"
import Stories from "./Stories"
import Suggestions from "./Suggestions"


function Feed() {

    const [scrollView, setScrollView] = useState('');

    useEffect(() => {
        document.addEventListener("scroll", () => {
          const scrollCheck = window.scrollY >= 100
          setScrollView(scrollCheck)
        })
    }, [])


    return (
        <main className = 'relative grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:max-w-6xl xl:grid-cols-3 mx-auto'>

            <section className = 'col-span-2'>
                 {/* Stories */}
                 <Stories />
                 {/* Post */}
                 <Posts />
                 
            </section>

            <section className = 'hidden xl:inline-grid md:grid-cols-1'>
                <div className = {`${scrollView ? 'fixed top-10 transition-all transform duration-700 ease-out' : 'fixed top-20 transition-all transform duration-700 ease-out'}`}>
                    <Profile />
                    {/* Profile */}

                    <Suggestions />
                    {/* Suggestions */}
                </div>
            </section>
        </main>
    )
}

export default Feed
