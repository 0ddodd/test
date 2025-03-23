import axios from 'axios';
import { Request, Response } from 'express';

export const getContacts = async (req: Request, res: Response) => {
    try {
        const resp = await axios.get(`${process.env.API_URL}?serviceKey=${process.env.SERVICE_KEY}&pageNo=1&numOfRows=10&cond[country_nm::EQ]=태국`);
        res.status(200).send({
            msg: "성공적으로 받아왔습니다.",
            items: resp.data.response.body.items
        });
    } catch (err) {
        res.send(err);
    }
}