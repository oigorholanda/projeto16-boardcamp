import { db } from "../database/database.js"

export default async function uniqueGame (req, res, next) {
    const {name} = req.body
    try {
        const repeatedGame = await db.query(`SELECT * FROM games WHERE name='${name}'`)
        console.log(repeatedGame.rowCount)
        if (repeatedGame.rowCount !== 0) return res.status(409).send("Jogo já cadastrado")

    } catch (error) {
        return res.status(500).send(`Erro no banco de dados! ${error.message}`) 
    }

    next()
}