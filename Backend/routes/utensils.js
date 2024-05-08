import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const q = "SELECT * FROM utensils_information";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


export default router;
