import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const q = "SELECT * FROM has_sales";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("/", (req, res) => {
  const q =
    "INSERT INTO has_sales (`date`,sales_item_name,amount,profit,branch_number) VALUES(?)";
  const values = [
    req.body.date,
    req.body.itemName,
    req.body.amount,
    req.body.profit,
    req.body.branchNumber,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("sales has been created successfully");
    }
  });
});

router.get("/branch", (req, res) => {
  const q = `SELECT * FROM has_sales WHERE (branch_number) IN (?)`;
  const branchNumbers = req.query.branches;
  console.log("bn", branchNumbers);
  db.query(q, [branchNumbers], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/minProfit", (req, res) => {
  const q = `SELECT * FROM has_sales 
            WHERE (branch_number, profit) IN 
            (SELECT branch_number, MIN(profit) 
            FROM has_sales
            GROUP BY branch_number)`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/maxTotalProfit", (req, res) => {
  const q = `SELECT *
    FROM (
        SELECT date, SUM(amount) AS amount, SUM(profit) AS profit, branch_number
        FROM has_sales 
        GROUP BY date, branch_number
    ) AS TP
    WHERE (branch_number, profit) IN (
        SELECT branch_number, MAX(totalProfit)
        FROM (
            SELECT SUM(profit) AS totalProfit, branch_number
            FROM has_sales 
            GROUP BY date, branch_number
        ) AS maxTotalProfitPerBranch
        GROUP BY branch_number
    )`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
export default router;
