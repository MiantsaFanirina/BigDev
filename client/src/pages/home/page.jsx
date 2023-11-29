import { useState } from "react"

// icons
import { Image } from "lucide-react"

// components 
import AddPostModal from "../../components/addPostModal"
import PostCard from "../../components/postCard"

const Post = {
    username: "Rakotondrafara Miantsa Fanirina",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus pariatur velit vel excepturi rerum optio quod minima voluptate voluptates, nobis eaque facere quos, tempore molestias aut libero id corporis iusto doloribus, nesciunt quia assumenda enim. Voluptate provident voluptatem delectus possimus. Eius soluta fugit reiciendis veritatis quo ab repudiandae magnam explicabo iste rem eaque maxime, iure minima facere sed. Qui incidunt adipisci numquam unde id ratione explicabo sequi libero deserunt dolores! Est earum voluptate provident molestias voluptatem aliquid tempora officia quos sunt consequatur illum recusandae minus dolores amet eum numquam molestiae dolorum, blanditiis ipsa repudiandae doloremque doloribus quae modi. Molestiae, quidem!",
    isLiked: true,
    createdAt: "2m",
    viewers: "Eliot, Monja et 345 autres"
}

function Home() {

    const [showAddPostModal, setShowAddPostModal] = useState(false)

    const toggleAddPostModal = () => {
        setShowAddPostModal(!showAddPostModal)
    }

    
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark")
    }

    return (
        <div className="w-full h-full flex flex-col items-center md:p-10 p-4 overflow-x-hidden overflow-y-scroll relative">

            <button onClick={toggleDarkMode} className="text-white absolte right-0 top-0">Switch dark mode</button>

            {/* add post */}
            <div className="px-10 md:w-[768px] w-full h-auto md:rounded md:shadow mb-8 dark:bg-slate-900 bg-white flex flex-col">
                
                {/* add form */}
                <div className="flex mt-8">
                    <div className="bg-slate-500 w-[40px] h-[40px] rounded-full mr-5"></div>
                    <button onClick={toggleAddPostModal} className=" w-full text-left dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-slate-900 bg-slate-200 hover:bg-slate-300 px-5 rounded-full">Quoi de neuf ?</button>
                </div>
                
                <hr className="mt-3"/>

                {/* add photo */}
                <div className="flex justify-center items-center py-3">

                    <button onClick={toggleAddPostModal} className="px-24 py-3 mx-3 hover:bg-slate-200 dark:hover:bg-slate-500 dark:text-slate-300 rounded-md cursor-pointer flex items-center content-center">
                        <Image className="text-pink-500"/>
                        <h3 className="ml-2 text-sm">Photo/Video</h3> 
                    </button>

                </div>

            </div>

            {/* Posts card */}
            <PostCard Post={Post}/>
            

            {showAddPostModal && <AddPostModal toggleAddPostModal={toggleAddPostModal}/>}
        </div>
    )
}

export default Home