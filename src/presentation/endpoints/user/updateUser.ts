import { Request, Response } from "express";
import { UserDB } from "../../../data/userDB";
import * as jwt from "jsonwebtoken";
import { UpdateUserUC } from "../../../business/usecases/user/updateUser";

export const updateUserEndpoint = async (req: Request, res: Response) => {
    try {
        const token = jwt.verify(req.headers.auth as string, process.env.JWT_KEY as string) as { userId: string }

        const id = token.userId

        const updateUserUC = new UpdateUserUC(new UserDB());

        const result = await updateUserUC.execute({
            userId: id,
            email: req.body.email,
            name: req.body.name,
            birthDate: req.body.birthDate
        });

        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            message: err.message,
            ...err
        });
    }
};
