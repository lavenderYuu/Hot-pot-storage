import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const DrinkInputComponent = ({
  branchNumber,
  storageName,
  selectedDrink,
  fetchDrinks,
}) => {
  const [drink_name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (selectedDrink) {
      setName(selectedDrink.drink_name);
      setPrice(selectedDrink.price.toString());
      setQuantity(selectedDrink.quantity.toString());
    } else {
      resetForm();
    }
  }, [selectedDrink]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setQuantity("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(drink_name);
    const drinkData = {
      drink_name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };
    console.log(drinkData);

    try {
      if (selectedDrink) {
        const url = `http://localhost:9900/drinks/${branchNumber}/${storageName}/${encodeURIComponent(
          selectedDrink.drink_name
        )}`;
        await axios.put(url, {
          price: drinkData.price,
          quantity: drinkData.quantity,
        });
      } else {
        const url = `http://localhost:9900/drinks/${branchNumber}/${storageName}`;
        const response = await axios.post(url, {
          drink_name: drinkData.drink_name,
          price: drinkData.price,
          quantity: drinkData.quantity,
        });

        if (response.status === 200) {
          alert("drinks successfully added!");
        } else {
          alert(response.data.sqlMessage);
        }
      }
      fetchDrinks();
      resetForm();
    } catch (error) {
      console.error("Error submitting the drink:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={drink_name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">
        {selectedDrink ? "Update Drink" : "Add Drink"}
      </button>
    </form>
  );
};

DrinkInputComponent.propTypes = {
  selectedDrink: PropTypes.shape({
    drink_name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }),
};

export default DrinkInputComponent;
