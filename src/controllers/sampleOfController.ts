import { Request, Response } from "express";
import { getErrorMessage } from "../utils/error";

type TResponse = {
    code: number,
    body: any
}

export default function SampleController (
    controller: (req: Request, res: Response) => Promise<TResponse> | Promise<void>
) {
    return async (req: Request, res: Response) => {
        try {
            const result: TResponse | void = await controller(req, res);
            res.status(result ? result.code : 200).send(result ? result.body : "None");
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }
}