import express from 'express';
import cors from 'cors'

export const server = express();
server.use(express.json());
server.use(cors({
    origin: '*',
}))

export default server;