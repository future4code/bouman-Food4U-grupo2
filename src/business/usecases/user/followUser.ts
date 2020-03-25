import { UserGateway } from "../../gateways/userGateway";

export class FollowUserUC {
  constructor(private userGateway: UserGateway) {}
  
  public async execute(input: FollowUserUCInput): Promise<FollowUserUCOutput | undefined>{
    await this.userGateway.createUserFollowRelation(input.userId, input.userToFollowId)

    return {
      message: "Você está seguindo o usuário."
    }
  }
}

export interface FollowUserUCInput {
  userId: string,
  userToFollowId: string
}

export interface FollowUserUCOutput {
  message: string
}