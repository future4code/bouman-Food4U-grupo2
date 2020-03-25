import { v4 } from "uuid";
import { User } from "../../entities/user";
import { UserGateway } from "../../gateways/userGateway";
import * as bcrypt from 'bcrypt';


export class SignupUC {
  constructor(private userGateway: UserGateway) {}

  public async execute(input: SignupUCInput): Promise<SignupUCOutput | undefined>{
    try{
      const id = v4();

      if(!input){
        return undefined
      }

      if (input.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }

      if(input.password.length < 6) {
        throw new Error('A nova senha deve conter no mínimo 6 carácteres')
      }
  
      const saltOrRounds = 10;
  
      const hashPassword = await bcrypt.hash(input.password, saltOrRounds )

      const newUser = new User(id, input.email, hashPassword, input.name, input.birthDate)
  
      await this.userGateway.createUser(newUser);
  
      return {
        message:"Usuário criado com sucesso",
      };
    }catch(err){
      console.log(err)
      throw new Error("Erro ao cadastrar usuário")
    }
  }
}

export interface SignupUCInput {
  email: string;
  password: string;
  name: string;
  birthDate: Date

}

export interface SignupUCOutput {
 message: string
}
