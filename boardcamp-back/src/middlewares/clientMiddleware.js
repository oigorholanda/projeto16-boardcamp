import { db } from "../database/database.js";

export async function uniqueClient(req, res, next) {
    const { cpf } = req.body;
  
    try {
      const repeatedClient = await db.query(`SELECT * FROM customers WHERE cpf='${cpf}'`);
  
      if (repeatedClient.rowCount !== 0)
        return res.status(409).send("Usuário já cadastrado");
  
    } catch (error) {
      return res.status(500).send(`Erro no banco de dados! ${error.message}`);
    }
  
    next();
  }

  export async function idClient(req, res, next) {
    const { id } = req.params;
    const { cpf } = req.body;
  
    try {
      const client = await db.query(`SELECT * FROM customers WHERE cpf='${cpf}'`);
      console.log(client.rows[0].id, id);
      if (client.rows[0].id != id)
        return res.status(409).send("Usuário não confere");
  
    } catch (error) {
      return res.status(500).send(`Erro no banco de dados! ${error.message}`);
    }
  
    next();
  }