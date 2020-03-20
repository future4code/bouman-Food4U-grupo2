import { UserGateway } from "../../gateways/userGateway";


export class GetUserDataUC {
  constructor(private userGateway: UserGateway) {}
  
  public async execute(input: GetUserDataUCInput): Promise<GetUserDataUCOutput | undefined>{
    try {
      const user = await this.userGateway.getUserById(input.userId);

      if(!user){
        throw new Error('Usuário não encontrado')
      }

      return {
        id: user.getId(),
        email: user.getEmail(),
        name: user.getName(),
        birthDate: user.getBirtDate().getTime()
      }
    }catch(err) {
      console.log(err)
      throw new Error("Erro ao pegar usuário")
    }
  }
}

export interface GetUserDataUCInput {
  userId: string
}

export interface GetUserDataUCOutput {
  id: string;
  email: string;
  name: string;
  birthDate: Number
}
