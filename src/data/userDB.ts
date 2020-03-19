import { UserGateway } from "../business/gateways/userGateway";
import { BaseDB } from "./baseDB";
import { User } from "../business/entities/user";


export class UserDB extends BaseDB implements UserGateway {

  private userTableName = "users";

  public async createUser(user: User): Promise<void> {
    await this.connection.raw(`
        INSERT INTO ${this.userTableName} (id, email, password, name, birthDate) 
        VALUES(
          '${user.getId()}',
          '${user.getEmail()}',
          '${user.getPassword()}',
          '${user.getName()}',
          '${user.getBirtDate()}'
          );
          `)
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.connection.raw(`
          SELECT * FROM ${this.userTableName} WHERE email='${email}'
          `);
    console.log(result[0][0])

    if (!result[0][0]) {
      return undefined
    }

    return new User(result[0][0].id, result[0][0].email, result[0][0].password, result[0][0].name, result[0][0].birthDate);
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await this.connection.raw(`
    SELECT * FROM ${this.userTableName} WHERE id='${id}'
    `);

    return new User(result[0][0].id, result[0][0].email, result[0][0].password, result[0][0].name, result[0][0].birthDate);
  }

  public async createUserFollowRelation(followerId: string, followedId: string): Promise<void> {
    await this.connection.raw(
    `INSERT INTO followers (follower_id, followed_id) 
    VALUES(
      '${followerId}',
      '${followedId}');
    `);

    const recipesResult = await this.connection.raw(
    `SELECT recipes.*, users.email, users.name 
    FROM recipes
    JOIN users on users.id = recipes.userId
    WHERE userId= '${followedId}';`)

    const promisesArray = recipesResult[0].map(async (recipe:any) => {
      return await this.connection.raw(
        `INSERT INTO recipes_feed
        (userId,
        recipeId,
        title,
        description,
        creationDate,
        authorEmail,
        authorName,
        authorId)
        VALUES
        ('${followerId}',
        '${recipe.id}',
        '${recipe.title}',
        '${recipe.description}',
        '${recipe.creationDate.toISOString().slice(0, 19).replace('T', ' ')}',
        '${recipe.email}',
        '${recipe.name}',
        '${recipe.userId}');`) 
    })

    await Promise.all(promisesArray)
  }

  // precisa do token do auth ( usuario precisa estar logado)
  public async changePassword(newPassword: string, userId: string): Promise<void> {
    await this.connection.raw(`UPDATE users 
                              SET password = '${newPassword}'
                              WHERE id = '${userId}';`
    )}

}