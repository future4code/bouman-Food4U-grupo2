import { FeedGateway } from "../../gateways/feedGateway";


export class GetFeedUC {
  constructor(private recipeGateway: FeedGateway) {}
  
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
          userEmail: recipe.getEmail(),
          userName: recipe.getUserName()
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
  userEmail: string,
  userName: string
}