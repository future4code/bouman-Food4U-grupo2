import { Request, Response } from "express";
import { UserDB } from "../../../data/userDB";
import { FollowUserUC } from "../../../business/usecases/user/followUser";
import * as jwt from "jsonwebtoken";

export const followUserEndpoint = async (req: Request, res: Response) => {
  try {
    const token = jwt.verify(req.headers.auth as string, process.env.JWT_KEY as string) as { userId: string }

    const followUserUC = new FollowUserUC(new UserDB());

    const result = await followUserUC.execute({
      userId: token.userId,
      userToFollowId: req.body.userToFollowId
    });
    
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};