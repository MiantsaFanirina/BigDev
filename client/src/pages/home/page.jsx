import { useState, useEffect, useContext } from "react"

// service
import { getAllPosts } from '../../services/post.service';

// navigation
import { useNavigate } from 'react-router-dom'

// icons
import { Image } from "lucide-react"

// components 
import AddPostModal from "./components/addPostModal"
import PostCard from "./components/postCard"

// Utils
import Cookies from 'js-cookie'

// context 
import { UserContext } from "../../context/userContext"


function Home() {
    //get User from the context
    const { user } = useContext(UserContext)

    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        const posts = await getAllPosts()
        setPosts(posts)
    }

    // navigation
    const history = useNavigate()

    const [showAddPostModal, setShowAddPostModal] = useState(false)

    const toggleAddPostModal = () => {
        setShowAddPostModal(!showAddPostModal)
    }

    
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark")
    }

    // lifecycle
    useEffect(() => {

        const token = Cookies.get('token')
    
        if (token === undefined) {
            // Redirect the user to "/"
            history('/login')
        }
        // get all posts
        getPosts()
    }, [])

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
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            

            {showAddPostModal && <AddPostModal toggleAddPostModal={toggleAddPostModal} user={user}/>}
        </div>
    )
}

export default Home