import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret_key = process.env.SECRET_KEY || "helloworld";
console.log(secret_key);

let createToken = async (payload: string | object) => jwt.sign(payload, secret_key);
let verifyToken = async (token: string) => jwt.verify(token, secret_key);

export { createToken, verifyToken };
