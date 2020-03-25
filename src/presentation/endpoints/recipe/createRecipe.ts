import { Request, Response } from "express";
import { RecipeDB } from "../../../data/recipeDB";
import { CreateRecipeUC } from "../../../business/usecases/recipe/createRecipe";
import * as jwt from "jsonwebtoken";


export const createRecipeEndpoint = async (req: Request, res: Response) => {
  try {
    const token = jwt.verify(req.headers.auth as string, process.env.JWT_KEY as string) as {userId: string}  
    
    const userId = token.userId

    const signupUC = new CreateRecipeUC(new RecipeDB());

    const result = await signupUC.execute({
      userId, 
      title: req.body.title,
      description: req.body.description    
    });
    
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};