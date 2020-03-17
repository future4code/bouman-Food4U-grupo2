import { RecipeGateway } from "../business/gateways/recipeGateway";
import { BaseDB } from "./baseDB";
import { Recipe } from "../business/entities/recipe";


export class RecipeDB extends BaseDB implements RecipeGateway {
    private recipeTableName = "recipes";

    public async createRecipe(recipe: Recipe): Promise<void> {
        await this.connection.insert({id: recipe.getId(), 
            title: recipe.getTitle(), 
            description: recipe.getDescription(), 
            creationDate: recipe.getCreationDate(), 
            userId: recipe.getUserId()}).into(this.recipeTableName)     
    }

    public async getRecipesByFollower(userId: string): Promise<Recipe[]> {
        const result = await this.connection.raw(`SELECT recipes.*
        FROM followers
        JOIN recipes ON recipes.userId = followed_id
        WHERE  follower_id = '${userId}';`)
        
        return result[0]
    }
}