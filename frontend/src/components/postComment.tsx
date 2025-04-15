import axios from 'axios';
import { useEffect, useState } from 'react'
import { InfoItem } from '../types/infoItem';

export interface PostCommentProps {
    id: string;
    post: InfoItem
};

function PostComment({id, post}: PostCommentProps) {

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
            console.log(resp);
            setComments(resp.data.post.comments);
            setComment("");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        console.log(post);
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
    <div className="d-flex flex-column gap-3" >

        {/* 댓글 입력 폼 */}
        <form onSubmit={(e) => e.preventDefault()} className="d-flex gap-2">
            <input
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="메모를 작성하세요"
            />
            <button
                className="btn btn-primary"
                onClick={onSubmitComment}
            >
                +
            </button>
        </form>

        {/* 댓글 목록 */}
        <div className="d-flex flex-column gap-3">
            {comments && comments.length > 0 ? comments.map(c => (
                <div key={c._id} className="card shadow-sm p-3">
                {isEditMode.id === c._id && isEditMode.mode ? (
                    <div className="d-flex flex-column gap-2">
                        <input
                            type="text"
                            className="form-control"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleUpdateComment(c._id)}
                            >
                                완료
                            </button>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setIsEditMode({ id: '', mode: false })}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <p className="mb-1 fw-semibold">{c.comment}</p>
                            <small className="text-muted">{new Date(c.createdAt).toLocaleString()}</small>
                        </div>
                        <div className="d-flex flex-column gap-1">
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => onEditMode(c._id, c.comment)}>수정</button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteComment(c._id)}>삭제</button>
                        </div>
                    </div>
                )}
                </div>
            )) : (
                <p className="text-muted">작성된 메모가 없습니다.</p>
            )}
            </div>
        </div>  
    )
}

export default PostComment