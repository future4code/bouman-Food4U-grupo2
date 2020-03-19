import { RecipeGateway } from "../../gateways/recipeGateway";

export class GetFeedUC {
  constructor(private recipeGateway: RecipeGateway) { }
  public async execute(input: GetFeedUCInput): Promise<GetFeedUCOutput[] | undefined> {
    try {
      const results = await this.recipeGateway.getFeed(input.userId)

      return results.map((recipe) => {
        return {
          id: recipe.getId(),
          title: recipe.getTitle(),
          description: recipe.getDescription(),
          creationDate: recipe.getCreationDate().getTime(),
          userId: recipe.getUserId(),
          email: recipe.getEmail()
        }
      });

    } catch (err) {
      console.log(err)
      throw new Error("Erro ao pegar receitas de seguidores")
    }
  }
}

export interface GetFeedUCInput {
  userId: string
}

export interface GetFeedUCOutput {
  id: string,
  title: string,
  description: string,
  creationDate: Number,
  userId: string,
  email: string
}