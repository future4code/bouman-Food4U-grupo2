import express from "express";
import { signupEndpoint } from "./endpoints/user/signUp";
import { loginEndpoint } from "./endpoints/user/login";
import { getUserDataEndpoint } from "./endpoints/user/getUserData";
import { createRecipeEndpoint } from "./endpoints/recipe/createRecipe";
import { followUserEndpoint } from "./endpoints/user/followUser"
import { getFeedEndpoint } from "./endpoints/feed/getFeed";
import { changePasswordEndpoint } from "./endpoints/user/changePassword";

const app = express();
app.use(express.json());

app.post('/signup', signupEndpoint);

app.post('/login', loginEndpoint);

app.get('/user', getUserDataEndpoint);

app.post("/user/follow", followUserEndpoint);

app.post("/change/password", changePasswordEndpoint);

app.post("/recipes", createRecipeEndpoint);

app.get("/feed", getFeedEndpoint);


export default app;


//  Desafio 1

// a) Com os conhecimentos adquiridos ao longo da semana foi mais tranquilo realizar esse desafio. 
// b) Esse endpoint agora também pega as informações de name e data de aniversário