import { Router } from "express";
import { createRental, deleteRental, finalizeRental, getRentals } from "../controllers/rentalsController.js";

const router = Router();

router.get("/rentals", getRentals)
router.post("/rentals", createRental)
router.post("/rentals/:id/return", finalizeRental)
router.delete("/rentals/:id", deleteRental)

export default router