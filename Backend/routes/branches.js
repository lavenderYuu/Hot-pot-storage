import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const q = "SELECT * FROM branches";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("/", (req, res) => {
  const q =
    "INSERT INTO branches (branch_number, location, Employee_Count) VALUES(?)";
  const values = [
    req.body.branch_number,
    req.body.location,
    req.body.Employee_Count,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("branches has been created successfully");
  });
});

export default router;
