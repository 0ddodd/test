import React, { useEffect, useState } from 'react'
import SearchForm from '../components/searchForm'
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
        // getData();
        console.log(infoItem);

    }, []);

    useEffect(() => {
        // getData();
        console.log(infoItem);
    }, [infoItem]);

    return (
        <div>
            <SearchForm setInfoItem={setInfoItem} />
            <div>
                {infoItem ? 
                    <>
                        <h2>{infoItem.country_nm}</h2>
                        <img src={infoItem.flag_download_url} alt="country flag" />
                        <h3>{infoItem.country_eng_nm}</h3>
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