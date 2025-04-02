import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function InputForm() {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = () => {

        // 로컬스토리지에서 목록 가져오기 (없으면 빈 배열)
        const existedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
        
        // 가져온 후 목록 업데이트
        const updatedPosts = [...existedPosts, { id: Date.now(), title, content }];
        
        // 로컬스토리지에 저장
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        
        setTitle("");
        setContent("");
        navigate("/posts")
    };

    return (
        <div className="container mt-5">
            <div>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="제목을 입력하세요"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />
                <textarea
                    className="form-control"
                    id="content"
                    rows={5}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={handleSubmit} type="submit" className="btn btn-primary">글쓰기</button>
            </div>
        </div>
    )
}

export default InputForm