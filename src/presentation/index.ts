import express, { Request, Response } from "express";
import { signupEndpoint } from "./endpoints/user/signUp";
import { loginEndpoint } from "./endpoints/user/login";
import { getUserDataEndpoint } from "./endpoints/user/getUserData";
import { createRecipeEndpoint } from "./endpoints/recipe/createRecipe";
import { followUserEndpoint } from "./endpoints/user/followUser"
import { getFeedEndpoint } from "./endpoints/recipe/getFeed";
import { changePasswordEndpoint } from "./endpoints/user/changePassword";

const app = express();
app.use(express.json());

app.post('/signup', signupEndpoint);

app.post('/login', loginEndpoint);

app.get('/user', getUserDataEndpoint);

app.post("/recipes", createRecipeEndpoint);

app.post("/user/follow", followUserEndpoint);

app.get("/feed", getFeedEndpoint);

app.post("/change/password", changePasswordEndpoint);

export default app;

//  Desafio 1

// a) Com os conhecimentos adquiridos ao longo da semana foi mais tranquilo realizar esse desafio. 
// b) Esse endpoint agora também pega as informações de name e data de aniversário