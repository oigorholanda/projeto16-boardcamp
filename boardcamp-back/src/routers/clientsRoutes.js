import { Router } from "express";
import { createClient, getClientId, getClients, updateClient } from "../controllers/clientsController.js";
import { uniqueClient, idClient } from "../middlewares/clientMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customerSchema.js";

const router = Router();

router.get("/customers", getClients)
router.get("/customers/:id", getClientId)
router.post("/customers", validateSchema(customerSchema), uniqueClient, createClient)
router.put("/customers/:id", validateSchema(customerSchema), idClient, updateClient)

export default router