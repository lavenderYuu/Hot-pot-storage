import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import SaleAdd from "./Components/SalesAdd";
import Drink from "./pages/Drink";
import DrinkStorage from "./pages/DrinkStorage";
import DishItems from "./pages/dish_items";
import Ingredients from "./pages/ingredients";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="nav-container">
          <ul className="nav-list">
            <li>
              <Link to="/sales">Sales</Link>
            </li>
            <li>
              <Link to="/DrinkStorage">Drink Storage</Link>
            </li>
            <li>
              <Link to="/dish_items">Dish Items</Link>
            </li>
            <li>
              <Link to="/ingredients">Ingredients</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/saleAdd" element={<SaleAdd />} />
          <Route
            path="/drink-storage/:branchNumber/:storageName/drinks"
            element={<Drink />}
          />
          <Route path="/DrinkStorage" element={<DrinkStorage />} />
          <Route path="/dish_items" element={<DishItems />} />
          <Route path="/ingredients" element={<Ingredients />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
