import express, { Request, Response } from "express";
import { signupEndpoint } from "./endpoints/user/signUp";
import { loginEndpoint } from "./endpoints/user/login";
import { getUserDataEndpoint } from "./endpoints/user/getUserData";
import { createRecipeEndpoint } from "./endpoints/recipe/createRecipe";
import { followUserEndpoint } from "./endpoints/user/followUser"
import { getRecipesByFollowerEndpoint } from "./endpoints/recipe/getRecipesByFollower";

const app = express();
app.use(express.json());

app.post('/signup', signupEndpoint);

app.post('/login', loginEndpoint);

app.get('/user', getUserDataEndpoint);

app.post("/recipes", createRecipeEndpoint);

app.post("/user/follow", followUserEndpoint);

app.get("/user/feed", getRecipesByFollowerEndpoint);

export default app;
