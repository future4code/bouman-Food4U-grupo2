import { Recipe } from "./recipe";

export class RecipeFeed extends Recipe {
    constructor(
       id: string,
       title: string,
       description: string,
       creationDate: Date,
       userId: string,
       private email: string
    ) {super(id,
        title,
        description,
        creationDate,
        userId)}
  
    public getEmail(): string {
      return this.email;
    }
  
    public setEmail(email: string): void {
      this.email = email;
    }
  }