import { v4 } from "uuid";
import { RecipeGateway } from "../../gateways/recipeGateway";
import { Recipe } from "../../entities/recipe";


export class CreateRecipeUC {
  constructor(private recipeGateway: RecipeGateway) {}
  
  public async execute(input: CreateRecipeUCInput): Promise<CreateRecipeUCOutput | undefined>{
    const recipeId = v4()

    const newRecipe = new Recipe(recipeId, input.title, input.description, new Date(), input.userId)

    await this.recipeGateway.createRecipe(newRecipe)
    
    return {
      message: "Receita criada com sucesso"
    }
  }
}

export interface CreateRecipeUCInput {
  title: string,
  description: string,
  userId: string
}

export interface CreateRecipeUCOutput {
  message: string
}