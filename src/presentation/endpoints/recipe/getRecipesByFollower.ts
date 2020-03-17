import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { RecipeDB } from "../../../data/recipeDB";
import { GetRecipesByFollowerUC } from "../../../business/usecases/recipe/getRecipesByFollower";

export const getRecipesByFollowerEndpoint = async (req: Request, res: Response) => {
    try {
      const token = jwt.verify(req.headers.auth as string, process.env.JWT_KEY as string) as {userId: string}

      const getRecipesByFollowerUC = new GetRecipesByFollowerUC(new RecipeDB);

      const result = await getRecipesByFollowerUC.execute({
        userId: token.userId
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({
        message: err.message,
        ...err
      });
    }
};