import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const q = "SELECT * FROM dish_items";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/filter_dish_items", (req, res) => {
  const selectedIngredients = req.query.selectedIngredients;
  console.log("Selected Ingredients:", selectedIngredients);

const q = `SELECT DISTINCT item_name, category, price
  FROM dish_items
  WHERE NOT EXISTS (
      SELECT * 
      FROM (
          SELECT ingredients_name 
          FROM ingredients 
          WHERE ingredients_name IN (?)
      ) AS subquery
      WHERE NOT EXISTS
      (SELECT p.ingredients_name 
      FROM process p 
      WHERE p.item_name = dish_items.item_name 
        AND subquery.ingredients_name = p.ingredients_name)
  )`;

  db.query(q, [selectedIngredients], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

export default router;