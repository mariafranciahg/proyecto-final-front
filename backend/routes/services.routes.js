import { Router } from "express";
import { pool } from "../db.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// GET services
router.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM services");
  res.json(rows);
});

// POST service (protegida)
router.post("/", verifyToken, async (req, res) => {
  const { name, price } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO services(name, price) VALUES($1,$2) RETURNING *",
    [name, price]
  );
  res.status(201).json(rows[0]);
});

export default router;
