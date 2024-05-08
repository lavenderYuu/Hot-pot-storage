import express, { query } from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const q = `SELECT * FROM ingredients i, ingredient_store store
  WHERE i.ingredients_name = store.ingredients_name`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/selected", (req, res) => {
  const columns = req.query.columns;
  const q = `SELECT ${columns} FROM ingredients i, ingredient_store store
  WHERE i.ingredients_name = store.ingredients_name`;
  db.query(q, columns, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/maxQuality", (req, res) => {
  const q = `SELECT branch_number FROM ingredients i, ingredient_store store
  WHERE i.ingredients_name = store.ingredients_name
  GROUP BY branch_number
  HAVING MAX(quantity) > 50
  `;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

export default router;
