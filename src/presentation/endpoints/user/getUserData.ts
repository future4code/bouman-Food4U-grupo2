import { Request, Response } from "express"; 
import { GetUserDataUC } from "../../../business/usecases/user/getUserData";
import { UserDB } from "../../../data/userDB";
import * as jwt from "jsonwebtoken";


export const getUserDataEndpoint = async (req: Request, res: Response) => {
  try {
    const data = jwt.verify( req.headers.auth as string,  process.env.JWT_KEY as string) as {userId: string}

    const getUserDataUC = new GetUserDataUC(new UserDB())

    const result = await getUserDataUC.execute({
      userId: data.userId
    });

    res.status(200).send(result);
  } catch(err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
  