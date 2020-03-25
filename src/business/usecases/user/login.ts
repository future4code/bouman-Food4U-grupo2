import { UserGateway } from "../../gateways/userGateway";
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";


export class LoginUC {
  constructor(private userGateway: UserGateway) {}

  public async execute(input: LoginUCInput): Promise<LoginUCOutput | undefined> {
    try {
      const user = await this.userGateway.getUserByEmail(input.email);

      if (!user) {
        throw new Error("Email incorreto");
      }

      if (!input) {
        return undefined
      }

      if (input.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }

      const isPasswordCorrect = await bcrypt.compare(input.password, user.getPassword());

      if (!isPasswordCorrect) {
        throw new Error("Senha incorreta")
      }

      const token = jwt.sign({userId: user.getId()}, process.env.JWT_KEY as string, { expiresIn: '2h' });

      return {
        message: "Usuário logado com sucesso",
        token: token
      }
    } catch (err) {
      console.log(err)
      throw new Error("Erro ao fazer login")
    }
  }
}

export interface LoginUCInput {
  email: string;
  password: string
}

export interface LoginUCOutput {
  message: string;
  token: string
}
