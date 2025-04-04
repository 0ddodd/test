import { useState } from 'react'
import SearchForm from '../components/searchForm'
import axios from 'axios';
import { InfoItem } from '../types/infoItem';

function MainPage () {

    const [infoItem, setInfoItem] = useState<InfoItem | null>(null);

    const onSaveContact = async () => {
        try {
            console.log(infoItem);
            const resp = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/post`, infoItem);
            alert(resp.data.msg);
            console.log(resp.data.msg);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(err.response?.data.error)
                // 이미 존재하는 국가입니다.
                // console.error('Axios Error: ', err.response?.data.error);
            } else {
                console.error('알 수 없는 에러: ', err);
            }
        }
    }

    // useEffect(() => {
    //     // getData();
    //     console.log(infoItem);

    // }, []);

    // useEffect(() => {
    //     // getData();
    //     console.log(infoItem);
    // }, [infoItem]);

    return (
        <div>
            <SearchForm setInfoItem={setInfoItem} />
            <div>
                {infoItem ? 
                    <>
                        <h2>{infoItem.country_nm}</h2>
                        <img src={infoItem.flag_download_url} alt="country flag" />
                        <h3>{infoItem.country_eng_nm}</h3>
                        <button onClick={onSaveContact}>저장</button>
                        <div dangerouslySetInnerHTML={{ __html: infoItem.contact_remark }} />
                        <img src={infoItem.dang_map_download_url} alt="country map" />
                    </>
                :
                    <p>해당하는 국가가 없습니다.</p>
                }
            </div>
        </div>
    )
}

export default MainPage