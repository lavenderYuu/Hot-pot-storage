import express from "express";
import cors from "cors";
import branchesRoutes from "./routes/branches.js";
import salesRoutes from "./routes/sales.js";
import dish_itemsRoutes from "./routes/dish_items.js";
import ingredientsRoutes from "./routes/ingredients.js";
import drinksRoutes from "./routes/drinks.js";
import utensilsRoutes from "./routes/utensils.js";
import drinkStorageRoutes from "./routes/drinkStorage.js";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("This is backend");
});

app.use("/branches", branchesRoutes);
app.use("/sales", salesRoutes);
app.use("/dish_items", dish_itemsRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/drinks", drinksRoutes);
app.use("/utensils", utensilsRoutes);
app.use("/drink-storage", drinkStorageRoutes);

app.listen(9900, () => {
  console.log("connnect to backend!");
});
