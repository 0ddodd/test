import React, { useEffect, useState } from 'react'

function postPage() {
    const [posts, setPosts] = useState<{id: number, title: string, content: string}[]>
    ([]);
    const [editMode, setEditMode] = useState({id: undefined, mode: false});
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    useEffect(()=>{
        const parsedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        console.log(parsedPosts);    
        setPosts(parsedPosts);
    },[]);

    const handleUpdateMode = (id: number) => {
        const editPost = posts.find(post => post.id === id); 
        setEditMode({id, mode: true});
        setNewTitle(editPost?.title);
        setNewContent(editPost?.content);
    };

    const handleUpdatePost = (id: number) => {
        const updatedPosts = posts.map(post => post.id === id 
            ? {...post, title: newTitle, content: newContent} : post);
        setPosts(updatedPosts);
        setEditMode({id, mode: false});
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    };

    const handleDeletePost = (id: number) => {
        const leftPosts = posts.filter(post => post.id !== id);
        setPosts(leftPosts);
        localStorage.setItem("posts", JSON.stringify(leftPosts));
    }

    return (
        <div>
            {posts.map(post => 
                <div key={post.id}>
                    {editMode.mode && post.id === editMode.id ?
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
                            <button onClick={()=>handleDeletePost(post.id)}>삭제</button>
                        </>
                    }
                </div>
            )}
        </div>
    )
}

export default postPage