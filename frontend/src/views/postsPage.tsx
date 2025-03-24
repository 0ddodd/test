import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InfoItem } from '../types/infoItem';


function postsPage() {

    const [posts, setPosts] = useState<InfoItem[]>([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const resp = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/post`);
        console.log(resp);
        setPosts(resp.data);
    };
    
    return (
        <div>
            {posts.length > 0 ?
                posts.map(post => 
                    <div key={post._id}>
                        <h2>{post.country_nm}</h2>
                        <img src={post.flag_download_url} alt="country flag" />
                        <h3>{post.country_eng_nm}</h3>
                        <div dangerouslySetInnerHTML={{ __html: post.contact_remark }} />
                        <img src={post.dang_map_download_url} alt="country map" />
                    </div>
                )
            :
                <p>저장된 포스트가 없습니다.</p>
            }
        </div>
    )
}

export default postsPage