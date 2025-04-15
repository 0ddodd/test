import { useEffect, useState } from 'react'
import SearchForm from '../components/searchForm'
import axios from 'axios';
import { InfoItem } from '../types/infoItem';
import CustomButton from '../components/customButton';
import { toast } from 'react-toastify';

function MainPage () {

    const [infoItem, setInfoItem] = useState<InfoItem | null>(null);
    const [searchWord, setSearchWord] = useState<string>("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => console.log(infoItem), [infoItem]);

    const onSaveContact = async () => {
        try {
            console.log(infoItem);
            const resp = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/post`, infoItem);
            toast(resp.data.msg, {
                type: 'success',
                position: 'bottom-right',
                autoClose: 2000,
            })
            console.log(resp.data.msg);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                
                toast(err.response?.data.error, {
                    type: 'error',
                    position: 'bottom-right',
                    autoClose: 2000,
                })

                // 이미 존재하는 국가입니다.
                // console.error('Axios Error: ', err.response?.data.error);
            } else {
                console.error('알 수 없는 에러: ', err);
            }
        }
    }

    return (
        <div className="container py-4">
            <div className='d-flex justify-content-center'>
                <SearchForm setInfoItem={setInfoItem} setSearchWord={setSearchWord} />
            </div>
        
            {infoItem ? (
            <div className="d-flex justify-content-center align-items-center mt-4" style={{ minHeight: '70vh' }}>
                <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '800px' }}>
                    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner text-center">
                            <div className="carousel-item active">
                                <img
                                    src={infoItem.flag_download_url}
                                    alt="flag"
                                    className="img-fluid mb-3 border"
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                                <h4 className="mb-3">{infoItem.country_nm}</h4>
                            </div>
                            <div className="carousel-item">
                                <div dangerouslySetInnerHTML={{ __html: infoItem.contact_remark }} className="p-3" />
                            </div>
                            <div className="carousel-item">
                                <img
                                    src={infoItem.dang_map_download_url}
                                    alt="map"
                                    className="img-fluid"
                                    style={{ maxHeight: '300px', objectFit: 'cover', cursor: 'zoom-in' }}
                                    onClick={()=>setShowModal(true)}
                                />
                            </div>

                            {showModal &&  (
                                <div
                                    className="modal fade show d-block"
                                    tabIndex={-1}
                                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                                    onClick={() => setShowModal(false)}
                                >
                                    <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
                                        <div className="modal-content border-0 bg-transparent">
                                            <img src={infoItem.dang_map_download_url} alt="map large" className="img-fluid rounded" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
            
                        {/* Carousel Controls */}
                        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </button>
                    </div>
            
                    <div className="text-center mt-4">
                        <CustomButton text="저장" onClick={onSaveContact} bg="primary" />
                    </div>
                </div>
            </div>
            ) : (
            <div className="text-center mt-5">
                <h5 className="text-muted">{searchWord ? `"${searchWord}"에 대한 결과가 없습니다.` : '검색어를 입력하세요.'}</h5>
            </div>
            )}
        </div>
        
        )
}

export default MainPage