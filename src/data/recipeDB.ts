import { RecipeGateway } from "../business/gateways/recipeGateway";
import { BaseDB } from "./baseDB";
import { Recipe } from "../business/entities/recipe";
import { RecipeFeed } from "../business/entities/recipeFeed";


export class RecipeDB extends BaseDB implements RecipeGateway {
    private recipeTableName = "recipes";

    public async createRecipe(recipe: Recipe): Promise<void> {
        await this.connection.insert({
            id: recipe.getId(),
            title: recipe.getTitle(),
            description: recipe.getDescription(),
            creationDate: recipe.getCreationDate(),
            userId: recipe.getUserId()
        }).into(this.recipeTableName)
    }


    public async getFeed(userId: string): Promise<RecipeFeed[]> {
        const result = await this.connection.raw(`SELECT recipes.*, users.email
        FROM followers
        JOIN recipes ON recipes.userId = followed_id
        JOIN users on users.id = followed_id
        WHERE  follower_id = '${userId}'
        ORDER BY creationDate DESC;`)

        return result[0].map((recipe: any) => {
            return new RecipeFeed(recipe.id, recipe.title, recipe.description, recipe.creationDate, recipe.userId, recipe.email)
        })

    }
}