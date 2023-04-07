import { db } from "../database/database.js";

export async function getClients(req, res) {
    try {
        const data = await db.query("SELECT * FROM customers;");
        res.send(data.rows)
    } catch (error) {
        res.status(500).send(`Erro no banco de dados! ${error.message}`)
    }
}

export async function getClientId(req, res) {
    const { id } = req.params

    try {
        const data = await db.query(`SELECT * FROM customers WHERE id=${id};`);

        if (data.rowCount === 0) return res.status(404).send("Usuário não encontrado")
        res.send(data.rows)
    } catch (error) {
        res.status(500).send(`Erro no banco de dados! ${error.message}`)
    }
}

export async function createClient(req, res) {

    const {name, phone, cpf, birthday} = req.body
    console.log(req.body, res.locals.costumer)

    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(`Erro no banco de dados! ${error.message}`)
    }
}

export async function updateClient(req, res) {
    const { id } = req.params
    const {name, phone, cpf, birthday} = req.body

    try {
        await db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(`Erro no banco de dados! ${error.message}`)
    }
}