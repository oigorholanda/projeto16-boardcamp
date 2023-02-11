import { db } from "../database/database.js";



export async function getGames(req, res) {
    try {
        const games = await db.query("SELECT * FROM games;");
        res.send(games.rows)
    } catch (error) {
        res.status(500).send(`Erro no banco de dados! ${error.message}`)
    }
}

export async function insertGame(req, res) {
    const {name, image, stockTotal, pricePerDay} = req.body

    try {
        const game = db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])
        console.log(game);
        
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(`Erro no banco de dados! ${error.message}`)
    }
}