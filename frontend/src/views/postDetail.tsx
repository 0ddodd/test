import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InfoItem } from '../types/infoItem';
import PostComment from '../components/postComment';

function PostDetail() {
    const [post, setPost] = useState<InfoItem>();
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        try {
        const resp = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/post/${id}`);
        console.log(resp);
        setPost(resp.data);
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div className="container py-4">
        {post && (
            <div className="row gx-5 ">
                {/* 왼쪽: 메인 콘텐츠 */}
                <div className="col-lg-8 mb-4">
                    <div className="card shadow-lg p-4" >
                        <div
                            id="myCarousel"
                            className="carousel slide h-100"
                            data-bs-ride="carousel"
                        >
                            <div
                            className="carousel-inner text-center"
                            style={{ height: '500px', overflowY: 'auto' }}
                            >
                                {/* 슬라이드 1: 국기 */}
                                <div className="carousel-item active">
                                    <div
                                        className="d-flex flex-column justify-content-center align-items-center"
                                        style={{ height: '500px' }} // 고정 높이는 이 안쪽 div에
                                    >
                                        <img
                                        src={post.flag_download_url}
                                        alt="flag"
                                        className="img-fluid mb-3 border rounded"
                                        style={{ height: '200px', objectFit: 'contain' }}
                                        />
                                        <h4 className="mb-3 fw-semibold">{post.country_nm}</h4>
                                    </div>
                                </div>


                                {/* 슬라이드 2: 연락처 */}
                                <div className="carousel-item">
                                    <div
                                    className="text-start p-3"
                                    dangerouslySetInnerHTML={{ __html: post.contact_remark }}
                                    />
                                </div>

                                {/* 슬라이드 3: 지도 */}
                                <div className="carousel-item">
                                    <img
                                        src={post.dang_map_download_url}
                                        alt="map"
                                        className="img-fluid rounded"
                                        style={{
                                            maxHeight: '100%',
                                            objectFit: 'cover',
                                            cursor: 'zoom-in',
                                    }}
                                    onClick={() => setShowModal(true)}
                                    />
                                </div>
                            </div>

                            {/* 슬라이드 버튼 */}
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#myCarousel"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon"></span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#myCarousel"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 댓글 */}
                <div className="col-lg-4">
                    <div className="card shadow-sm p-3 h-100 d-flex flex-column">
                        <h5 className="mb-3">💬 댓글</h5>
                        <div className="overflow-auto">
                            <PostComment id={id!} post={post} />
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default PostDetail;
