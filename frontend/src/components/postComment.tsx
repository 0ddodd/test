import axios from 'axios';
import React, { useEffect, useState } from 'react'

function PostComment({id, post}) {

    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<{comment: string, _id: string}[]>([]);
    
    const onSubmitComment = async () => {
        if (!comment.trim()) return;
        const newComments = [...comments, {comment}];

        try {
            console.log(newComments);
            const resp = await axios.patch(`${import.meta.env.VITE_API_BACKEND_URL}/post/${id}`, 
                {comments: newComments}
            );
            setComments(resp.data.post.comments);
            setComment("");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        // console.log(post.comments);
        setComments(post.comments);
    }, []);

    const handleDeleteComment = async (commentId: string) => {
        try {
            const newComments = comments.filter(comment => comment._id !== commentId);
            const resp = await axios.patch(`${import.meta.env.VITE_API_BACKEND_URL}/post/${id}`, 
                {comments: newComments}
            );
            setComments(resp.data.post.comments);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="메모를 작성하세요"
                />
                <button
                    onClick={onSubmitComment}
                >저장</button>
            </form>
            <div>
                {comments && comments.length > 0 && comments.map(c => 
                    <div key={c._id}>
                        <span>{c.comment}</span>
                        <button>수정</button>
                        <button onClick={()=>handleDeleteComment(c._id)}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostComment