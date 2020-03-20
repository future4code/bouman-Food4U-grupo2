import { Request, Response } from "express";
import { SignupUC } from "../../../business/usecases/user/signUp";
import { UserDB } from "../../../data/userDB";


export const signupEndpoint = async (req: Request, res: Response) => {
  try {
    const signupUC = new SignupUC(new UserDB());

    const result = await signupUC.execute({
      email: req.body.email,
      password: req.body.password,
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
  