import React, { useEffect, useState } from "react";
import axios from "axios";
import DrinkInputComponent from "../Components/DrinkInputComponents";
import { useParams } from "react-router-dom";

const Drink = () => {
  const { branchNumber, storageName } = useParams();
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const fetchDrinks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9900/drinks/${branchNumber}/${storageName}`
      );
      setDrinks(response.data);
    } catch (error) {
      console.error("Error fetching drinks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, [branchNumber, storageName]);

  const handleDeleteDrink = async (drinkName) => {
    try {
      const url = `http://localhost:9900/drinks/${encodeURIComponent(
        drinkName
      )}`;
      await axios.delete(url);
      fetchDrinks();
    } catch (error) {
      console.error("Error deleting the drink:", error);
    }
  };

  const handleEditClick = (drink) => {
    setSelectedDrink(drink);
  };

  if (isLoading) {
    return <div>Loading drinks...</div>;
  }

  return (
    <div>
      <h1>Drinks List</h1>
      <DrinkInputComponent
        branchNumber={branchNumber}
        storageName={storageName}
        selectedDrink={selectedDrink}
        fetchDrinks={fetchDrinks}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drinks.map((drink) => (
              <tr key={drink.drink_name}>
                <td>{drink.drink_name}</td>
                <td>{drink.price}</td>
                <td>{drink.quantity}</td>
                <td>
                  <button onClick={() => handleEditClick(drink)}>Edit</button>
                  <button onClick={() => handleDeleteDrink(drink.drink_name)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drink;
