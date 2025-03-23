import React, { useEffect, useState } from 'react'
import InputForm from '../components/inputForm'
import axios from 'axios';

interface InfoItem {
    country_nm: string;
    country_eng_nm: string;
    contact_remark: string;
    flag_download_url: string;
    dang_map_download_url: string;
    [key: string]: string;
}

function MainPage () {

    const [infoItem, setInfoItem] = useState<InfoItem | null>(null);

    useEffect(() => {
        console.log(import.meta.env.VITE_API_BACKEND_URL)
        getData();
    }, []);

    const getData = async () => {
        // 실험용
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/contact`);
            console.log(res.data.msg);
            setInfoItem(res.data.items.item[0]);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {infoItem && <div>
                <h2>{infoItem.country_nm}</h2>
                <img src={infoItem.flag_download_url} alt="country flag" />
                <h3>{infoItem.country_eng_nm}</h3>
                <div dangerouslySetInnerHTML={{ __html: infoItem.contact_remark }} />
                <img src={infoItem.dang_map_download_url} alt="" />
            </div>}
            {/* <InputForm /> */}
        </div>
    )
}

export default MainPage