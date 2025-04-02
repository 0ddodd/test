import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { InfoItem } from '../types/infoItem';
import PostComment from '../components/postComment';

function PostDetail() {

    const [post, setPost] = useState<InfoItem>();
    const { id } = useParams();
    
    useEffect(() => {
        getPost();
    }, []);
    
    const getPost = async () => {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/post/${id}`);
            setPost(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {post && 
                <div>
                    <h2>{post.country_nm}</h2>
                    <PostComment id={id!} post={post}/>
                    <img src={post.flag_download_url} alt="country flag" />
                    <h3>{post.country_eng_nm}</h3>
                    <div dangerouslySetInnerHTML={{ __html: post.contact_remark }} />
                    <img src={post.dang_map_download_url} alt="country map" />
                </div>
            }
        </div>
    )
}

export default PostDetail;