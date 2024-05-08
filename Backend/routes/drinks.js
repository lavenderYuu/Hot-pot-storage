import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/:branchNumber/:storageName", (req, res) => {
  const { branchNumber, storageName } = req.params;

  const q =
    "SELECT * FROM drinks d, drink_store ds WHERE d.drink_name = ds.drink_name AND branch_number = ? AND storage_name = ?";
  const values = [branchNumber, storageName];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error fetching drinks:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching drinks" });
    }
    return res.json(data);
  });
});

router.delete("/:drinkName", (req, res) => {
  const { drinkName } = req.params;

  const q = "DELETE FROM drinks WHERE drink_name = ?";

  db.query(q, drinkName, (err, result) => {
    if (err) {
      console.error("Error deleting drink:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting drink" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Drink not found" });
    }
    return res.status(200).json({ message: "Drink deleted successfully" });
  });
});

router.post("/:branchNumber/:storageName", (req, res) => {
  const { branchNumber, storageName } = req.params;
  const { drink_name, price, quantity } = req.body;
  const qCheckDrink = "SELECT * FROM drinks WHERE drink_name = ?";
  db.query(qCheckDrink, [drink_name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error checking drink existence" });
    }

    if (results.length > 0) {
      const qInsertDrinkStore =
        "INSERT INTO drink_store (storage_name, branch_number, drink_name, quantity) VALUES (?, ?, ?, ?)";
      const values = [storageName, branchNumber, drink_name, quantity];

      db.query(qInsertDrinkStore, values, (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error inserting into drink_store table" });
        }
        return res
          .status(200)
          .json({ message: "Drink store data inserted successfully" });
      });
    } else {
      const qInsertDrink =
        "INSERT INTO drinks (drink_name, price) VALUES (?, ?)";
      const drinkValues = [drink_name, price];

      db.query(qInsertDrink, drinkValues, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error inserting into drinks table" });
        }
        const qInsertDrinkStore =
          "INSERT INTO drink_store (storage_name, branch_number, drink_name, quantity) VALUES (?, ?, ?, ?)";
        const storeValues = [storageName, branchNumber, drink_name, quantity];

        db.query(qInsertDrinkStore, storeValues, (err, data) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error inserting into drink_store table" });
          }
          return res.status(200).json({
            message: "Drink and drink store data inserted successfully",
          });
        });
      });
    }
  });
});

router.put("/:branch_number/:storage_name/:drinkName", (req, res) => {
  const { branch_number, storage_name, drinkName } = req.params;
  const { price, quantity } = req.body;
  console.log(branch_number, price, quantity);

  const qUpdateDrink = "UPDATE drinks SET price = ? WHERE drink_name = ?";
  const qUpdateDrinkStore =
    "UPDATE drink_store SET quantity = ? WHERE drink_name = ? AND storage_name = ? AND branch_number = ?";

  db.query(qUpdateDrink, [price, drinkName], (err, result) => {
    if (err) {
      console.error("Error updating drink:", err.message);
      return res
        .status(500)
        .json({ error: "An error occurred while updating drink" });
    }
    db.query(
      qUpdateDrinkStore,
      [quantity, drinkName, storage_name, branch_number],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error update drink_store table" });
        }
        return res.status(200).json({
          message: "Drink and drink store data updated successfully",
        });
      }
    );
  });
});

export default router;
