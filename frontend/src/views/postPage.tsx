import React, {useEffect, useState} from 'react'

function postPage() {
    const [posts, setPosts] = useState<{id:number, title: string, content: string}[]>([]);
    const [editMode, setEditMode] = useState({
        id: undefined,
        mode: false
    });
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    useEffect(() => {
        // 로컬 스토리지에서 글 목록 받아오기
        const existedposts = JSON.parse(localStorage.getItem('posts') || "[]")
        setPosts(existedposts);
    }, []);

    const handleUpdateMode = (id: number) => {
        setEditMode({id, mode: true});
    };

    const handleUpdatePost = (id: number) => {
        const updatedPosts = posts.map(post => post.id === id ? {...post, title: newTitle, content: newContent} : post);
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        setEditMode({id: undefined, mode: false});
    }

    const handleDeletePost = (id: number) => {
        const leftPosts = posts.filter(post => post.id !== id);
        setPosts(leftPosts);
        localStorage.setItem("posts", JSON.stringify(leftPosts));
    };

    return (
        <div>
            <ul>
                {posts && posts.length === 0 ? (
                    <p>저장된 글이 없습니다.</p>
                ) : (
                    posts.map((post:{id: number, title: string, content: string}) => (
                        <li key={post.id}>
                            <div>
                                {editMode.mode && editMode.id === post.id ?
                                <>
                                    <input
                                        value={newTitle}
                                        onChange={(e)=>setNewTitle(e.target.value)}
                                    />
                                    <textarea
                                        value={newContent}
                                        onChange={(e)=>setNewContent(e.target.value)}
                                    />
                                    <button onClick={()=>handleUpdatePost(post.id)}>완료</button>
                                </>
                                :
                                <>
                                    <p>{post.title}</p>
                                    <p>{post.content}</p>
                                <button onClick={()=>handleUpdateMode(post.id)}>수정</button>
                                    <button onClick={()=>handleDeletePost(post.id)}>
                                        삭제
                                    </button>
                                </>
                                }
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default postPage