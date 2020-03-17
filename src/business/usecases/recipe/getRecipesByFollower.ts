import { RecipeGateway } from "../../gateways/recipeGateway";
import { Recipe } from "../../entities/recipe";


export class GetRecipesByFollowerUC {
  constructor(private recipeGateway: RecipeGateway) {}
  public async execute(input: GetRecipesByFollowerUCInput): Promise<GetRecipesByFollowerUCOutput | undefined>{
    try{
      const recipes = await this.recipeGateway.getRecipesByFollower(input.userId)

      return {
        feed: recipes
      }
    }catch(err){
      console.log(err)
      throw new Error("Erro ao pegar receitas de seguidores")
    }
  }
}

export interface GetRecipesByFollowerUCInput {
  userId: string
}

export interface GetRecipesByFollowerUCOutput {
  feed: Recipe[];
}