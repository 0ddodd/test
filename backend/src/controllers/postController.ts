import { Request, Response } from 'express';
import { Post } from '../models/Post';

export const addPost = async (req: Request, res: Response): Promise<void> => {
    try {
        
        console.log("add post.")

        // 중복 조건 처리
        const { country_nm } = req.body;
        const countryExisted = await Post.findOne({country_nm});
        if (countryExisted) {
            res.status(400).send({error: '이미 저장된 국가입니다.'});
            return;
        }
        
        const newPost = new Post(req.body);
        
        await newPost.save();

        res.status(200).send({
            msg: "성공적으로 저장되었습니다.",
            item: req.body
        });

    } catch (err) {
        res.send(err);
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        if (!posts) {
            res.status(404).send({msg: "게시글을 찾을 수 없습니다"})
        }
        res.status(200).send(posts);
    } catch (err) {
        res.send(err);
    }
};

export const getPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).send({msg: "게시글을 찾을 수 없습니다"})
        }

        res.status(200).send(post);
    } catch (err) {
        res.send(err);
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).send({msg: "게시글을 찾을 수 없습니다"})
        }

        res.status(200).send({
            msg: "성공적으로 삭제되었습니다",
            post
        });
    } catch (err) {
        res.send(err);
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).send({msg: "게시글을 찾을 수 없습니다"})
        } else {
            console.log(req.body);
            post.comments = req.body.comments;
            console.log(post);
            // post.comments.push({comment: req.body.comment});
            await post.save();
    
            res.status(200).send({msg: "댓글이 추가되었습니다", post});
        };
    } catch (err) {
        res.send(err);
    }
}