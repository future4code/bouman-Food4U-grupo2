import { UserGateway } from "../../gateways/userGateway";


export class UpdateUserUC {
    constructor(private userGateway: UserGateway) { }

    public async execute(input: updateUserUCInput): Promise<updateUserUCOutput | undefined> {
        try {

            if (!input) {
                return undefined
            }

            if (input.email) {
                if (input.email.indexOf("@") === -1) {
                    throw new Error("Invalid email");
                }

                await this.userGateway.changeEmail(input.email, input.userId);
            }

            if (input.name) {
                await this.userGateway.changeName(input.name, input.userId);
            }

            if (input.birthDate) {
                await this.userGateway.changeBirthDate(input.birthDate, input.userId);
            }

            return {
                message: "Usuário atualizado com sucesso",
            };
        } catch (err) {
            console.log(err)
            throw new Error("Erro ao atualizar dados do usuário")
        }
    }
}

export interface updateUserUCInput {
    userId: string;
    email: string;
    name: string;
    birthDate: Date
}

export interface updateUserUCOutput {
    message: string
}
