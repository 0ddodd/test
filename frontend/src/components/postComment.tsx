import axios from 'axios';
import React, { useEffect, useState } from 'react'

function PostComment({id, post}) {

    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<{
        comment: string, createdAt: Date, _id: string
    }[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [isEditMode, setIsEditMode] = useState(
        {id: '', mode: false}
    );
    
    const onSubmitComment = async () => {
        if (!comment.trim()) return;
        const newComments = [...comments, {comment}];

        try {
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
            const newComments = comments.filter(com => com._id !== commentId);
            const resp = await axios.patch(`${import.meta.env.VITE_API_BACKEND_URL}/post/${id}`, 
                {comments: newComments}
            );
            setComments(resp.data.post.comments);
        } catch (err) {
            console.error(err);
        }
    };

    const onEditMode = async (commentId: string, text: string) => {
        setNewComment(text);
        setIsEditMode({id: commentId, mode: true});
    };

    const handleUpdateComment = async (commentId: string) => {
        try {
            const newComments = comments.map(com => com._id === commentId
                ? {...com, comment: newComment, createdAt: Date.now()}
                : com
            );
            const resp = await axios.patch(`${import.meta.env.VITE_API_BACKEND_URL}/post/${id}`, 
                {comments: newComments}
            );
            console.log(resp);
            setComments(resp.data.post.comments);
            setIsEditMode({id, mode: false});
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
                        {
                            isEditMode.id === c._id && isEditMode.mode ?
                            <>
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button
                                    onClick={()=>handleUpdateComment(c._id)}
                                >완료</button>
                            </>
                            :
                            <>
                                <span>{c.comment}</span>
                                <button onClick={()=>onEditMode(c._id, c.comment)}>수정</button>
                            </>
                        }
                        <span>{new Date(c.createdAt).toLocaleString()}</span>
                        <button onClick={()=>handleDeleteComment(c._id)}>삭제</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostComment