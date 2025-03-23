import axios from 'axios';
import React, { useState } from 'react'

function searchForm({setInfoItem}) {
    
    const [keyword, setKeyword] = useState("");

    const handleSubmit = async () => {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/contact/${keyword}`);
            console.log(resp.data.msg);
            setInfoItem(resp.data.items.item[0]);
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