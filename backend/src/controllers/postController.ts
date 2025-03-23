import { Request, Response } from 'express';

export const addPost = async (req: Request, res: Response) => {
    try {
        console.log("add post.")
        console.log(req.body);
        res.status(200).send({
            msg: "성공적으로 저장되었습니다.",
            // item: req.body
        });
    } catch (err) {
        res.send(err);
    }
}