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
        
        const obj = {...req.body, comments: ""};
        const newPost = new Post(obj);
        
        await newPost.save();
        res.status(200).send({
            msg: "성공적으로 저장되었습니다.",
            item: obj
        });

    } catch (err) {
        res.send(err);
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (err) {
        res.send(err);
    }
};

export const getPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).send(post);
    } catch (err) {
        res.send(err);
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).send({
            msg: "성공적으로 삭제되었습니다",
            post
        });
    } catch (err) {
        res.send(err);
    }
};