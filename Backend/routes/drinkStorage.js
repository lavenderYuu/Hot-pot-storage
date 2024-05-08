import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const q =
    `SELECT dsb.*, dsc.temperature,dsc.volume
    FROM drink_storage_belonging dsb, drink_storage_condition dsc 
    WHERE dsb.storage_name = dsc.storage_name`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


export default router;