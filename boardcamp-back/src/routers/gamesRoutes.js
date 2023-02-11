import { Router } from "express";
import { getGames, insertGame } from "../controllers/gamesController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/gameSchema.js";

const router = Router();

router.get("/games", getGames)
router.post("/games", validateSchema(gameSchema), insertGame)

export default router