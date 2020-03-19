import { Recipe } from "../entities/recipe";
import { RecipeFeed } from "../entities/recipeFeed";

export interface RecipeGateway {
    createRecipe(recipe: Recipe): Promise<void>
    getFeed(userId: string): Promise<RecipeFeed[]>
}