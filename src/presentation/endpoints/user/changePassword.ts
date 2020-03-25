import { Request, Response } from "express";
import { UserDB } from "../../../data/userDB";
import * as jwt from "jsonwebtoken";
import { ChangePasswordUC } from "../../../business/usecases/user/changePassword";


export const changePasswordEndpoint = async (req: Request, res: Response) => {
 
  try {
    const token = jwt.verify(req.headers.auth as string, process.env.JWT_KEY as string) as {userId: string}  
    
    const id = token.userId

    const changePasswordUC = new ChangePasswordUC(new UserDB());
    
    const result = await changePasswordUC.execute({
      userId: id,
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword  
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
  