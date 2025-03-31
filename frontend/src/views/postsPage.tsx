import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InfoItem } from '../types/infoItem';
import { useNavigate } from 'react-router-dom';


function postsPage() {

    const [posts, setPosts] = useState<InfoItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const resp = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/post`);
        console.log(resp);
        setPosts(resp.data);
    };

    const onDeletePost = async (id: string) => {
        const resp = await axios.delete(`${import.meta.env.VITE_API_BACKEND_URL}/post/${id}`);
        alert(resp.data.msg);
        const leftPosts = posts.filter(post => post._id !== id);
        setPosts(leftPosts); 
    };
    
    return (
        <div>
            {posts.length > 0 ?
                posts.map(post => 
                    <div key={post._id}>
                        <button onClick={()=>navigate(`/post/${post._id}`)}>{post.country_nm}</button>
                        <button onClick={()=>onDeletePost(post._id)}>x</button>
                    </div>
                )
            :
                <p>저장된 포스트가 없습니다.</p>
            }
        </div>
    )
}

export default postsPage