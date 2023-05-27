import NavBarUser from "../components/users/NavBarUser";
import AsideContentUser from "../components/users/AsideContentUser";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OneBlog } from "../api/blog";
import LikePost from "../api/likepost";
import { useSelector } from "react-redux";


export default function SinglePostUser() {
    const [post, setPost] = useState([]);
    const [ like, setLike ] = useState(false);
    const { postIdUser } = useParams()
    const liked = useSelector((state) => state.post.data)

    useEffect (() => {
        OneBlog(postIdUser)
        .then((res) => {
            setPost(res.data[0])
            const blogidLiked = liked.map((res) => (res.BlogId))
            setLike(blogidLiked.findIndex(x => x == postIdUser) != -1)
        })
    }, [liked, postIdUser] )

    if(post == []){
        return <p>LOADING</p>
    }

    const token = useSelector((state) => state.auth.token)


    console.log(postIdUser)

    const navigate = useNavigate()

    useEffect (() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate('/')
        }
    })

    //like
    const handleLike = (BlogId) => {
        console.log(BlogId)
        LikePost(token, { BlogId })
        .then(()=> setLike(true))
        .catch((err) => console.log(err))
    }

    return (
        <>
        <div className="w-screen flex content-around gap-2">
            <div className="flex-2 sticky top-0 h-60 w-[18rem]">
                <NavBarUser />
            </div>
            <div className="flex-5 w-[50rem]">
                    <div className="w-[48.5rem] h-fit m-auto mt-5 grid justify-center">
                        <div className="img w-[48.5rem] grid">
                            <div className="w-[46rem] h-[19rem] m-2 shadow-lg shadow-darkcho rounded-lg mx-auto">
                                <img className="w-full h-full object-cover rounded-lg"
                                    src={"../src/assets/IMG_2419.JPG"}
                                    alt="img" />
                            </div>
                        </div>
                        <div className="desc m-2 mt-8 flex flex-col gap-2 h-fit">
                            <div className="cat date flex justify-between">
                                <div className="cat px-2 underline font-fira bg-olive text-ivory rounded-sm">
                                    {post.Category?.name}
                                </div>
                                <div className="date font-libre text-sm px-2 text-gray-600">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="title h-fit text-center p-2 align-baseline font-monts font-bold text-2xl">
                                {post.title}
                            </div>
                            <div className="keyword">
                                {post.Blog_Keywords && post.Blog_Keywords.map((keyword) => (
                                    <span className="bg-ivory rounded-md keyword px-2 text-sage font-semibold w-fit mx-1 ">
                                        {keyword?.Keyword?.name}
                                    </span>
                                ))}
                            </div>
                            <div className="profpic, username, likes flex justify-between py-2">
                                <div className="flex gap-1 justify-end px-1 pt-[1.5px]">
                                    <div className="w-5 h-5 rounded-full overflow-hidden"> 
                                    <img className="w-full h-full"
                                    src={post?.User?.imgProfile}
                                    alt="x" />
                                    </div>
                                    <div className="font-fira text-sm text-gray-500 mx-1">
                                        {post?.User?.username}
                                    </div>
                                </div>
                                <div className="flex gap-1 justify-end">
                                    <div>
                                        <p className="text-xs pt-1 text-darkcho font-bold"></p>
                                    </div>
                                    <div onClick={()=>handleLike(post.id)}>
                                        { like ? 
                                        <i className='bx bxs-heart mr-[10px] text-darkcho' style={{color:"lightcho"}} ></i> :
                                        <i className='bx bxs-heart mr-[10px] text-lightcho' style={{color:"lightcho"}} ></i>
                                        }
                                    </div>
                                </div>
                            </div>
                        <div className="content h-fit">
                            <div className="my-4 mx-10 font-libre font-semibold indent-12 text-justify"> 
                                {post.content}
                            </div>
                        </div>
                        </div>
                    </div>
            </div>
            <div className="flex-2 justify-center">
                <AsideContentUser/>
            </div>
        </div>
        </>
    )
}