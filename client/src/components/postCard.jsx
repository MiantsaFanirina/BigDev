import { useState } from 'react'

// icons
import { X, Heart, MessageSquare } from "lucide-react"

export default function PostCard({Post}) {

    // props
    const initialDescription = Post.description

    // states
    const [isLiked, setIsLiked] = useState(Post.isLiked)
    const [showFullDescription, setShowFullDescription] = useState(false)

    /**** interactions ****/
    // like
    const toggleLike = () => {
        setIsLiked(!isLiked)
    }

    // see more
    const initialDescriptionWords = initialDescription.split(' ')
    const maxWords = 20
    const sliceDescription = initialDescriptionWords.slice(0, maxWords).join(' ')
    const isLongDescription = initialDescriptionWords.length > maxWords

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription)
    }


    return (
        <div className="md:w-[768px] w-full bg-white dark:bg-slate-900 md:rounded md:shadow flex flex-col mb-8">
                    
            {/* card-header */}
            <div className="flex justify-between mx-10 mt-10 mb-6">

                {/* profile section */}
                <div className="flex">
                    <div className="bg-slate-500 w-[40px] h-[40px] rounded-full"></div>
                    <div className="ml-4 flex flex-col justify-center">
                        <h1 className="font-semibold text-lg dark:text-slate-50">{Post.username}</h1>
                        <p className="text-sm text-slate-500">{Post.createdAt}</p>
                    </div>
                </div>

                <div className="flex items-center justify-center text-slate-500 w-10 h-10 rounded-full hover:bg-slate-100 cursor-pointer">
                    <X />
                </div>                

            </div>
            
            {/* description */}
            {/* See more render option */}
            <p className="flex flex-col mb-10 mx-10 dark:text-slate-300">


                {/* Render condition of description */}
                {showFullDescription ? initialDescription : sliceDescription}
                
                {/* handle the "voir plus..." and "voir moins" render */}
                {isLongDescription && initialDescriptionWords.length >= maxWords && !showFullDescription ? (
                    <span
                        className="text-pink-500 cursor-pointer"
                        onClick={toggleDescription}
                    >
                        voir plus...
                    </span>
                ) : (
                    isLongDescription && initialDescriptionWords.length >= maxWords && (
                        <span
                            className="text-pink-500 cursor-pointer"
                            onClick={toggleDescription}
                        >
                            voir moins
                        </span>
                    )
                )}

            </p>

            {/* image section */}
            <div className="w-full h-[500px] min-h-[320px] max-h-[300px] bg-slate-500 mb-6 overflow-hidden"></div>

            {/* like section */}
            <div className="w-full px-10 mb-6 flex items-center">
                <Heart size={16} className="text-slate-500"/> 
                <p className="ml-2 text-sm text-slate-500">{Post.viewers}</p>
            </div>
            
            <hr className="mb-6"/>

            {/* action section */}
            <div className="w-full px-10 mb-6 flex items-center justify-center ">

                {/* like button */}
                <button onClick={toggleLike} className={`px-24 py-3 mx-3 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-md cursor-pointer flex items-center content-center ${isLiked ? "text-pink-500" : "dark:text-slate-300"}`}>
                    <Heart size={16}/>
                    <h3 className="ml-2 text-sm">J'aime</h3> 
                </button>
                
                {/* comment button */}
                <button className="px-24 py-3 mx-3 hover:bg-slate-200 dark:hover:bg-slate-500 dark:text-slate-300 rounded-md cursor-pointer flex items-center content-center">
                    <MessageSquare size={16}/>
                    <h3 className="ml-2 text-sm">Commenter</h3> 
                </button>

            </div>

        </div>
    )
}