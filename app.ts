import dotenv from "dotenv";

dotenv.config();

import { Server } from "./src/models";

const server = new Server();

//Inicio el servidor
server.listen();
