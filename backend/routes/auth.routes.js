import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  await pool.query(
    "INSERT INTO users(email, password) VALUES($1,$2)",
    [email, hash]
  );

  res.status(201).json({ msg: "Usuario creado" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!rows.length) return res.status(404).json({ msg: "No existe" });

  const valid = bcrypt.compareSync(password, rows[0].password);
  if (!valid) return res.status(401).json({ msg: "Password incorrecta" });

  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);

  res.json({ token });
});

export default router;
