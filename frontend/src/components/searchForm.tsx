import axios from 'axios';
import { useState } from 'react'
import { InfoItem } from '../types/infoItem';
import CustomButton from './customButton';

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
                className="form-control mt-3"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)} 
            />
            <button onClick={handleSubmit} className='btn p-0 border-0 bg-transparent'>
                <i className="bi bi-search"></i>
            </button>
        </form>
    )
}

export default searchForm