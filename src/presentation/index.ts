import express from "express";
import { signupEndpoint } from "./endpoints/user/signUp";
import { loginEndpoint } from "./endpoints/user/login";
import { getUserDataEndpoint } from "./endpoints/user/getUserData";
import { createRecipeEndpoint } from "./endpoints/recipe/createRecipe";
import { followUserEndpoint } from "./endpoints/user/followUser"
import { getFeedEndpoint } from "./endpoints/feed/getFeed";
import { changePasswordEndpoint } from "./endpoints/user/changePassword";
import { updateUserEndpoint } from "./endpoints/user/updateUser";

const app = express();
app.use(express.json());

app.post('/signup', signupEndpoint);

app.post('/login', loginEndpoint);

app.get('/user', getUserDataEndpoint);

app.post("/user/follow", followUserEndpoint);

app.post("/change/password", changePasswordEndpoint);

app.post("/recipes", createRecipeEndpoint);

app.get("/feed", getFeedEndpoint);

app.post("/update/user", updateUserEndpoint);


export default app;


//  Desafio 1

// a) Com os conhecimentos adquiridos ao longo da semana foi mais tranquilo realizar esse desafio. 
// b) Esse endpoint agora também pega as informações de name e data de aniversário

// Desafio 2

// ok

// Desafio 3
// A autenticação não é prejudicada porque no token só esta guardado o id do usuário.

// Dsafio 4 
// a) alteramos a entidade de usuário, colocando um passwordTime opcional, e assim que o usuario fosse alterar a senha, caso esse passwordTime fosse nulo ele mudara a senha e adicionara o passwordTime do momento, senão ele verificaria a diferença entre eles e se fosse maior que 2 horas ele iria alterar e salvar o novo dateTime, caso contrario retornaria o erro.
//  b) não utilizamos nenhuma lib externa