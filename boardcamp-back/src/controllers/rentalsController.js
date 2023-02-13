import { db } from "../database/database.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  //const { customerId, gameId, order, desc, offset, limit, status, startDate } = req.body;

  try {
    const data = await db.query(`SELECT rentals.*,
        json_build_object(
            'id', customers.id,'name', customers."name"
        ) AS customer,
        json_build_object(
            'id', games.id,'name', games."name"
        ) AS game FROM rentals
        
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;`);
    res.send(data.rows);
  } catch (error) {
    res.status(500).send(`Erro no banco de dados! ${error.message}`);
  }
}

export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const rentDate = dayjs(Date.now()).format('YYYY-MM-DD')

    try {
        const gamePrice = await db.query('SELECT * FROM games WHERE id = $1', [gameId])
        const totalPrice = gamePrice.rows[0].pricePerDay * daysRented

        await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") 
            VALUES ($1, $2, $3, $4, $5)`,
            [customerId, gameId, daysRented, rentDate, totalPrice])
        return res.sendStatus(201)

    } catch (error) {
        res.status(500).send(`Erro no banco de dados! ${error.message}`);
    }
    
}

export async function finalizeRental(req, res) {

    const { id } = req.params

    try {
        const returnDate = new Date(Date.now())

        const { rentDate, daysRented, gameId } = req.rental.rows[0]
        let daysDiff = calculateDaysDiff(rentDate, daysRented, returnDate)

        const gamePrice = await db.query('SELECT * FROM games WHERE id = $1', [gameId])
        const delayFee = gamePrice.rows[0].pricePerDay * daysDiff
        

        await db.query(
            `UPDATE rentals SET "delayFee" = $1, "returnDate" = $2 
            WHERE id = $3`,
            [delayFee, returnDate, id]
        )
        return res.sendStatus(200)

    } catch (error) {
        console.log(err)
        res.status(500).send(`Erro no banco de dados! ${error.message}`);
    }
}

export async function deleteRental(req, res) {

    const { id } = req.params

    try {
        await db.query('DELETE FROM rentals WHERE id = $1', [id])
        return res.sendStatus(200)

    } catch (error) {
        console.log(err)
        res.status(500).send(`Erro no banco de dados! ${error.message}`);
    }
}
