import { useState, useEffect, useContext } from 'react'

// icons
import { X, Heart, MessageSquare } from "lucide-react"

// service
import { getUserById } from "../../../services/users.service"
import { createLike, deleteLike, getLikesByPostId, isPostLikeByAUser } from '../../../services/like.service'
import { deletePost } from '../../../services/post.service'
// fromat
import { formaterDate } from '../../../utils/format'

// context
import { UserContext } from '../../../context/userContext'

// default user profile
import defaultProfile from '../../../assets/profile.png'

// socket
import { socket } from '../../../utils/socketIoClient'
import PostSlider from './postSlider';

export default function postCard({post, getPosts}) { 
    
    const { user } = useContext(UserContext)

    // states
    const [isLiked, setIsLiked] = useState(false)
    const [postUser, setPostUser] = useState(null)
    const [likeUser, setLikeUser] = useState('')
    const [showFullDescription, setShowFullDescription] = useState(false)
    const [mediaCount, setMediaCount] = useState(0)

    // get the post user
    const getUser = async () => {
        const user = await getUserById(post.user_id)
        setPostUser(user)
    }
    
    // get All the post likes
    const getPostLikes = async () => {
        // Introduce a 500ms delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const likes = await getLikesByPostId(post.id);

        if (likes.length === 0) {
            setLikeUser('Aucun like');
            return;
        }

        const currentUserLiked = likes.some(like => like.user_id === user.id);

        const userNames = await Promise.all(
            likes.map(async (like) => {
                const liker = await getUserById(like.user_id);
                return liker.id === user.id ? 'Vous' : liker.name;
            })
        );

        const numberOfLikes = likes.length;

        if (currentUserLiked) {
            const otherLikedList = userNames.filter(name => name !== 'Vous');
            if (otherLikedList.length === 0) {
                setLikeUser('Vous');
            } else if (otherLikedList.length === 1) {
                setLikeUser(`Vous et ${otherLikedList[0]}`);
            } else {
                const remainingCount = otherLikedList.length - 1;
                setLikeUser(`Vous, ${otherLikedList.slice(0, 1).join(', ')} et ${remainingCount} autre${remainingCount === 1 ? '' : 's'}`);
            }
        } else {
            if (numberOfLikes === 1) {
                setLikeUser(`${userNames[0]}`);
            } else if (numberOfLikes === 2) {
                setLikeUser(`${userNames.join(' et ')}`);
            } else {
                const remainingCount = numberOfLikes - 2;
                setLikeUser(`${userNames.slice(0, 2).join(', ')} et ${remainingCount} autre${remainingCount === 1 ? '' : 's'}`);
            }
        }
    };
    
    useEffect(() => {
        const checkIsLiked = async () => {
            // Introduce a 500ms delay
            await new Promise(resolve => setTimeout(resolve,500));
            const isLiked = await isPostLikeByAUser(post.id, user?.id)
            setIsLiked(isLiked.isLiked)
        }
        checkIsLiked()
    }, [post, user])
    
    useEffect(() => {
        if (post && post.user_id) {
            getUser()
        } else {
            setPostUser(null)
        }
    }, [post, user, isLiked])
    
    useEffect(() => {

        // get All the post like
        getPostLikes()
    }, [post, user, isLiked])


    /** SOCKET */
    useEffect(() => {
        socket.on('likeIsUpdated', (username) => {
            // add the post
            getPostLikes()
        })
        
        return () => {
            socket.off('likeIsUpdated')
        }
    }, [socket])
    
    
    /** INTERACTIONS */
    const toggleLike = () => {
        if (!isLiked) {
            createLike(post?.id, user?.id)
            setIsLiked(prevIsLiked => !prevIsLiked);
        } else {
            deleteLike(post?.id, user?.id)
            setIsLiked(prevIsLiked => !prevIsLiked);
        }

        socket.emit('likeUpdate', {})
    }

    const removePost = async (post_id) => {
        await deletePost(post_id)
        getPosts()
        const username = "delete"
        socket.emit('postUpdate', username)
    }
    
    const initialDescription = post.description
    const initialDescriptionWords = initialDescription.split(' ')
    const maxWords = 20
    const sliceDescription = initialDescriptionWords.slice(0, maxWords).join(' ')
    const isLongDescription = initialDescriptionWords.length > maxWords

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription)
    }

    return (
        <div className="md:w-[768px] w-full bg-white dark:bg-slate-900 md:rounded md:shadow flex flex-col mb-8 relative">
            <div className="w-full flex flex-col relative">
                
                {mediaCount === 0 ? null : <span className="absolute bottom-0 right-0 text-sm text-white px-3 py-1 bg-slate-500 rounded-tl-md opacity-75">{mediaCount}</span>}    
                {/* card-header */}
                <div className="flex justify-between mx-10 mt-10 mb-6">

                    {/* profile section */}
                    <div className="flex">
                        <div className="bg-slate-500 w-[40px] h-[40px] rounded-full overflow-hidden">
                            <img src={postUser?.profile_picture_url === "" ? defaultProfile : ""} alt="default profile picture" className="w-full h-full object-cover object-center"/>
                        </div>

                        <div className="ml-4 flex flex-col justify-center">
                            <h1 className="font-semibold text-lg dark:text-slate-50">{postUser?.name}</h1>
                            <p className="text-sm text-slate-500">publié le {formaterDate(post.createdAt)}</p>
                        </div>
                    </div>

                    {post?.user_id === user?.id ?<div onClick={async () => await removePost(post?.id)} className="flex items-center justify-center text-slate-500 w-10 h-10 rounded-full hover:bg-slate-100 cursor-pointer">
                        <X /> 
                    </div> : null}

                </div>
                            
                {/* description */}
                {/* See more render option */}
                <p className="flex flex-col mb-10 mx-10 dark:text-slate-300 relative">


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
            </div>
            {/* image section */}
            {post?.media[0] ? <div className="w-full h-[500px] relative  bg-slate-300 mb-6 overflow-hidden">
                <PostSlider media={post?.media} setMediaCount={setMediaCount}></PostSlider>  
            </div> : null}

            {/* like section */}
            <div className="w-full px-10 mb-6 flex items-center">
                <Heart size={16} className="text-slate-500"/> 
                <p className="ml-2 text-sm text-slate-500">{likeUser}</p>
            </div>
            
            <hr className="mb-6"/>

            {/* action section */}
            <div className="w-full px-10 mb-6 flex items-center justify-center ">

                {/* like button */}
                <button onClick={toggleLike} className={`md:px-24 px-10 py-3 mx-3 md:hover:bg-slate-200 md:dark:hover:bg-slate-500 rounded-md cursor-pointer flex items-center content-center ${isLiked ? "text-pink-500" : "dark:text-slate-300"}`}>
                    <Heart size={16}/>
                    <h3 className="ml-2 text-sm">J'aime</h3> 
                </button>
                
                {/* comment button */}
                <button className="md:px-24 px-10 py-3 mx-3 dark:text-slate-300 hover:dark:text-slate-800 hover:bg-slate-200 md:dark:hover:bg-slate-500 md:dark:text-slate-300 rounded-md cursor-pointer flex items-center content-center">
                    <MessageSquare size={16}/>
                    <h3 className="ml-2 text-sm">Commentaires</h3> 
                </button>

            </div>

        </div>
    )
}