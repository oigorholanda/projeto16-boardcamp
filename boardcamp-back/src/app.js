import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import gamesRoutes from "../src/routers/gamesRoutes.js"
import clientsRoutes from "../src/routers/clientsRoutes.js"
import rentalsRoutes from "./routers/rentalsRoutes.js"


//servidor
const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use([gamesRoutes, clientsRoutes, rentalsRoutes]);


// porta e listen
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));