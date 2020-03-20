import { FeedGateway } from "../business/gateways/feedGateway";
import { BaseDB } from "./baseDB";
import { RecipeFeed } from "../business/entities/recipeFeed";


export class FeedDB extends BaseDB implements FeedGateway {
  private feedTableName = "recipes_feed";

  public async getFeed(userId: string): Promise<RecipeFeed[]> {
    const response = await this.connection.raw(
    `SELECT * FROM ${this.feedTableName}
    WHERE userId = '${userId}'
    ORDER BY creationDate DESC;`)

    return response[0].map((recipe: any) => {
      return new RecipeFeed(
        recipe.recipeId, 
        recipe.title, 
        recipe.description, 
        recipe.creationDate, 
        recipe.authorId, 
        recipe.authorEmail, 
        recipe.authorName)
    })
  }
}