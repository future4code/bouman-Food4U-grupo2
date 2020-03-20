import { UserGateway } from "../../gateways/userGateway";
import * as bcrypt from 'bcrypt';


export class ChangePasswordUC {
  constructor(private userGateway: UserGateway) {}

  public async execute(input: ChangePasswordUCInput): Promise<ChangePasswordUCOutput | undefined> {
    try {
      const user = await this.userGateway.getUserById(input.userId);

      if(!user){
        throw new Error('Usuário não encontrado')
      }

      const compare = await bcrypt.compare(input.oldPassword , user.getPassword());

      if(!compare){
        throw new Error('Senha antiga incompatível')
      }

      if(input.newPassword.length < 6) {
        throw new Error('A nova senha deve conter no mínimo 6 carácteres')
      }

      const saltOrRounds = 10;

      const cryptPassword = await bcrypt.hash(input.newPassword, saltOrRounds);

      await this.userGateway.changePassword(cryptPassword, input.userId)

      return{
        message:"Senha alterada com sucesso"
      }
    }catch(err){
      console.log(err)
      throw new Error("Problema ao alterar senha")
    }
  }
}
  
export interface ChangePasswordUCInput {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordUCOutput {
  message: string
}
  