import { useState } from "react"

// icons
import { X, ThumbsUp, MessageSquare } from "lucide-react"

function Home() {

    const [isLiked, setIsLiked] = useState(false)

    const toggleLike = () => {
        setIsLiked(!isLiked)
    }

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark")
    }

    const initialDescription =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores perferendis nulla sapiente ad earum dignissimos, consectetur cupiditate sed adipisci totam! Facilis ullam nam, quae animi pariatur impedit optio sed, adipisci veritatis, nihil sunt aut quasi excepturi vel obcaecati expedita error dolorem consequatur nisi temporibus earum nobis saepe harum in. Optio molestiae dolorum voluptatem in nostrum veritatis sed accusamus autem doloribus repellat voluptatum tempora non magni minus iste distinctio porro ipsa earum molestias et, veniam suscipit libero quasi. Corrupti, distinctio placeat!"
    const sliceDescription = initialDescription.slice(0, 150)

    const [showFullDescription, setShowFullDescription] = useState(false)

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription)
    }

    return (
        <div className="w-full h-full flex flex-col items-center md:p-10 p-4 overflow-x-hidden overflow-y-scroll relative">

            <button onClick={toggleDarkMode} className="text-white absolte right-0 top-0">Switch dark mode</button>

            {/* card */}
            <div className="md:w-[768px] w-full bg-white dark:bg-slate-900 md:rounded md:shadow flex flex-col">
                
                {/* card-header */}
                <div className="flex justify-between mx-10 mt-10 mb-6">

                    {/* profile section */}
                    <div className="flex">
                        <div className="bg-slate-500 w-16 h-16 rounded-full"></div>
                        <div className="ml-4 flex flex-col justify-center">
                            <h1 className="font-semibold text-lg dark:text-slate-50">Rakotondrafara Miantsa Fanirina</h1>
                            <p className="text-sm text-slate-500">2m</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center text-slate-500 w-10 h-10 rounded-full hover:bg-slate-100 cursor-pointer">
                        <X />
                    </div>                

                </div>
                
                {/* description */}
                <p className="flex flex-col mb-10 mx-10 dark:text-slate-300">

                    {showFullDescription ? initialDescription : sliceDescription}
                    {!showFullDescription ? (
                        <span
                            className="text-pink-500 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            voir plus...
                        </span>
                    ) : (
                        <span
                            className="text-pink-500 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            voir moins
                        </span>
                        )
                    }
                </p>

                {/* image section */}
                <div className="w-full h-[500px] min-h-[320px] max-h-[300px] bg-slate-500 mb-6 overflow-hidden"></div>

                {/* like section */}
                <div className="w-full px-10 mb-6 flex items-center">
                    <ThumbsUp size={16} className="text-slate-500"/> 
                    <p className="ml-2 text-sm text-slate-500">Miantsa Fanirina, Monja et 6 autres</p>
                </div>
                
                <hr className="mb-6"/>

                {/* action section */}
                <div className="w-full px-10 mb-6 flex items-center justify-center ">

                    {/* like button */}
                    <button onClick={toggleLike} className={`px-24 py-3 mx-3 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-md cursor-pointer flex items-center content-center ${isLiked ? "text-pink-500" : "dark:text-slate-300"}`}>
                        <ThumbsUp size={16}/>
                        <h3 className="ml-2 text-sm">J'aime</h3> 
                    </button>
                    
                    {/* comment button */}
                    <button className="px-24 py-3 mx-3 hover:bg-slate-200 dark:hover:bg-slate-500 dark:text-slate-300 rounded-md cursor-pointer flex items-center content-center">
                        <MessageSquare size={16}/>
                        <h3 className="ml-2 text-sm">Commenter</h3> 
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Home