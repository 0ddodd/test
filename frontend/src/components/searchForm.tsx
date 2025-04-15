import axios from 'axios';
import { useState } from 'react'
import { InfoItem } from '../types/infoItem';

interface serachFormProps {
    setInfoItem: (item: InfoItem | null) => void;
    setSearchWord: (value: string) => void;
};

function searchForm({setInfoItem, setSearchWord}: serachFormProps) {
    
    const [keyword, setKeyword] = useState<string>("");

    const handleSubmit = async () => {
        try {
            if (keyword === "") return;
            const resp = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/contact/${keyword}`);
            console.log(resp.data.msg);
            console.log(resp.data);
            const email = localStorage.getItem('user_info');
            if (resp.data.items.item.length > 0) {
                const item = {
                    ...resp.data.items.item[0],
                    comments: [],
                    user: JSON.parse(email || "")
                };
                setSearchWord(keyword);
                setInfoItem(item);
            } else {
                console.log('검색 결과 없음');
                setSearchWord(keyword);
                setInfoItem(null);
            }
            setKeyword("");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="w-50">
            <form className="position-relative m-3" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="form-control"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)} 
                />
                <button
                    onClick={handleSubmit}
                    className='btn position-absolute top-50 end-0 translate-middle-y me-3 p-0 border-0 bg-transparent'>
                    <i className="bi bi-search"></i>
                </button>
            </form>
        </div>
    )
}

export default searchForm