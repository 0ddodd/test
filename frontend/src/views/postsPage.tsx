import axios from 'axios';
import { useEffect, useState } from 'react'
import { InfoItem } from '../types/infoItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


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
        toast(`${resp.data.msg}`, {
            type: 'success',
            position: 'bottom-right',
            autoClose: 2000,
            style: {
                fontSize: '14px'
            }
        })
        const leftPosts = posts.filter(post => post._id !== id);
        setPosts(leftPosts); 
    };
    
    return (
        <div className="container py-5">
            {posts.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {posts.map((post) => (
                <div
                    key={post._id}
                    className="col-md-4 col-sm-6 mb-3"
                >
                    <div className="card shadow-sm">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <span className="fw-semibold">{post.country_nm}</span>
                            <div>
                                <button
                                    onClick={() => navigate(`/post/${post._id}`)}
                                    className="btn btn-sm btn-outline-primary me-2"
                                >
                                    보기
                                </button>
                                <button
                                    onClick={() => onDeletePost(post._id)}
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            ) : (
            <div className="text-center text-muted">
                <p>저장된 포스트가 없습니다.</p>
            </div>
            )}
        </div>
    )
}

export default postsPage