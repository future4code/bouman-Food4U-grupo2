import express, { Request, Response } from "express";
import { signupEndpoint } from "./endpoints/signUp";
import { loginEndpoint } from "./endpoints/login";
import { getUserDataEndpoint } from "./endpoints/getUserData";

const app = express();
app.use(express.json());

app.post('/signup', signupEndpoint);

app.post('/login', loginEndpoint);

app.get('/user', getUserDataEndpoint);

export default app;
