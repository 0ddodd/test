import axios from 'axios';
import { useState } from 'react'
import { InfoItem } from '../types/infoItem';

interface serachFormProps {
    setInfoItem: (item: InfoItem) => void;
};

function searchForm({setInfoItem}: serachFormProps) {
    
    const [keyword, setKeyword] = useState<string>("");

    const handleSubmit = async () => {
        try {
            if (keyword === "") return;
            const resp = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/contact/${keyword}`);
            console.log(resp.data.msg);
            const email = localStorage.getItem('user_info');
            const item = {
                ...resp.data.items.item[0],
                comments: [],
                user: JSON.parse(email || "")
            };
            setInfoItem(item);
            setKeyword("");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form className="mb-5" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)} 
            />
            <button onClick={handleSubmit}>검색</button>
        </form>
    )
}

export default searchForm