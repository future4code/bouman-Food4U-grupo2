import { RecipeGateway } from "../business/gateways/recipeGateway";
import { BaseDB } from "./baseDB";
import { Recipe } from "../business/entities/recipe";


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

    const authorId = recipe.getUserId()

    const FollowerId = await this.connection.raw(
      `SELECT followers.follower_id 
      FROM followers 
      WHERE followed_id = '${authorId}'`
    )

    const authorData = await this.connection.raw(
      `SELECT email, name
      FROM users 
      WHERE id = '${authorId}';`
    )

    const promisesArray = FollowerId[0].map(async (follower:any) => {
      return await this.connection.raw(
      `INSERT INTO recipes_feed
      (userId,
      recipeId,
      title,
      description,
      creationDate,
      authorEmail,
      authorName,
      authorId)
      VALUES
      ('${follower.follower_id}',
      '${recipe.getId()}',
      '${recipe.getTitle()}',
      '${recipe.getDescription()}',
      '${recipe.getCreationDate().toISOString().slice(0, 19).replace('T', ' ')}',
      '${authorData[0][0].email}',
      '${authorData[0][0].name}',
      '${recipe.getUserId()}');`
      ) 
    })

    await Promise.all(promisesArray)
  }
}