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
        <div className='d-flex justify-content-center mt-5'>
            <div className="position-relative mb-5 w-75" onSubmit={(e) => e.preventDefault()}>
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
            </div>
        </div>
    )
}

export default searchForm