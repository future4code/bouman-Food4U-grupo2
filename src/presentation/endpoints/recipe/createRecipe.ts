import { Request, Response } from "express";
import { RecipeDB } from "../../../data/recipeDB";
import { CreateRecipeUC } from "../../../business/usecases/recipe/createRecipe";


export const createRecipeEndpoint = async (req: Request, res: Response) => {
    try {
      const signupUC = new CreateRecipeUC(new RecipeDB());
      const result = await signupUC.execute({
        title: req.body.title,
        description: req.body.description,   
        userId: req.body.userId   
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message,
        ...err
      });
    }
};