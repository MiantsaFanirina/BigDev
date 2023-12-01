import { useState, useEffect, useContext } from "react"

// service
import { getAllPosts } from '../../services/post.service';

// navigation
import { useNavigate } from 'react-router-dom'

// toast
import { toast } from 'react-toastify';

// icons
import { Image } from "lucide-react"

// components 
import AddPostModal from "./components/addPostModal"
import PostCard from "./components/postCard"

// Utils
import Cookies from 'js-cookie'

// context 
import { UserContext } from "../../context/userContext"

// default user profile
import defaultProfile from '../../assets/profile.png'

// socket
import { socket } from '../../utils/socketIoClient'

function Home() {

    //get User from the context
    const { user } = useContext(UserContext)

    // states
    const [posts, setPosts] = useState([])
    const [showAddPostModal, setShowAddPostModal] = useState(false)

    // navigation
    const history = useNavigate()

    
    // get all post
    const getPosts = async () => {
        const posts = await getAllPosts()
        setPosts(posts)
    }

    const getNewPosts = async () => {
        const postsData = await getAllPosts();
        
        // Identify new posts by comparing with existing posts
        const newPosts = postsData.filter(newPost => !posts.some(existingPost => existingPost.id === newPost.id));
    
        // Update the state with new posts
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
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


    /* SOCKET */
    useEffect(() => {
        

        socket.on('postIsUpdated', (username) => {
            // add the post
            getNewPosts()

            toast(`${username} a ajouté un post`, {
                autoClose: 5000,
            });
        })
        

        return () => {
            socket.off('postIsUpdated')
        }

    }, [socket])

    /* INTERACTIONS */
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
                    <div className="bg-slate-500 w-[40px] h-[40px] rounded-full mr-5 overflow-hidden">
                    <img src={user?.profile_picture_url === "" ? defaultProfile : ""} alt="default profile picture" className="w-full h-full object-cover object-center"/>
                    </div>
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
            {posts.length > 0 ? posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post) => (
                    <PostCard key={post.id} post={post} />
                )): <p className="text-xl text-slate-800 dark:text-slate-200">Aucun post pour l'instant</p>
            }
            

            {showAddPostModal && <AddPostModal toggleAddPostModal={toggleAddPostModal} user={user} getPosts={getNewPosts}/>}
        </div>
    )
}

export default Home