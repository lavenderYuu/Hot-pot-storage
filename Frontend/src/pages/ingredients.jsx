import React, { useEffect, useState } from "react";
import axios from "axios";

const Ingredient = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [Columns, setColumns] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:9900/ingredients");
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
      setColumns([...Columns, name]);
    } else {
      setColumns(Columns.filter((column) => column !== name));
    }
  };

  const handleButtonClick = async () => {
    if (Columns.length == 0) return;
    try {
      const response = await axios.get(
        "http://localhost:9900/ingredients/selected",
        {
          params: {
            columns: Columns,
          },
        }
      );
      console.log("Filtered data:", response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
    handleButtonClick;
  };

  const handleButtonClick2 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9900/ingredients/maxQuality"
      );
      console.log("Filtered data:", response.data);
      if(response.data.length == 0) alert("No such branch");
      setResult(response.data);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
    handleButtonClick2;
  };

  return (
    <div>
      <h1>Ingredient Table</h1>
      <div>
        <input
          type="checkbox"
          id="i.ingredients_name"
          name="i.ingredients_name"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="i.ingredients_name">Ingredient Name</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="expired_date"
          name="expired_date"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="expired_date">Expired Date</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="price"
          name="price"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="price">Price</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="category"
          name="category"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="category">Category</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="quantity"
          name="quantity"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="quantity">Quantity</label>
      </div>
      <button onClick={handleButtonClick}>Filter</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Ingredient Name</th>
              <th>Expired Date</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.ingredients_name}</td>
                <td>
                  {item.expired_date
                    ? new Date(item.expired_date).toISOString().split("T")[0]
                    : ""}
                </td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Find the branch(es) with more than 50 units of any single ingredient in
        storage.
      </p>
      <button onClick={handleButtonClick2}>Find</button>
      <div>
        {result.map((branch_number, index) => (
          <div key={index}>
            <p>Branch number(s): {branch_number.branch_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredient;
