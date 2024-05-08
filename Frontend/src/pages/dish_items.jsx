import React, { useEffect, useState } from "react";
import axios from "axios";

const DishItems = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:9900/dish_items");
        setFilteredData(result.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedIngredients([...selectedIngredients, name]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((ingredient) => ingredient !== name)
      );
    }
  };

  const fetchFiltered = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9900/dish_items/filter_dish_items",
        {
          params: {
            selectedIngredients: selectedIngredients,
          },
        }
      );
      console.log("Filtered data:", response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
    fetchFiltered;
  };

  return (
    <div>
      <h1>Dish Item Table</h1>
      <p>Filter dish items with ingredients:</p>
      <div>
        <input
          type="checkbox"
          id="carrots"
          name="carrots"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Carrots">Carrots</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="eggs"
          name="eggs"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Eggs">Eggs</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="rice"
          name="rice"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Rice">Rice</label>
      </div>
      <button onClick={fetchFiltered}>Find</button>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.item_name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DishItems;
