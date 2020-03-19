import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { RecipeDB } from "../../../data/recipeDB";
import { GetFeedUC } from "../../../business/usecases/recipe/getFeed";

export const getFeedEndpoint = async (req: Request, res: Response) => {
    try {
      const token = jwt.verify(req.headers.auth as string, process.env.JWT_KEY as string) as {userId: string}

      const getFeedUC = new GetFeedUC(new RecipeDB);

      const result = await getFeedUC.execute({
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