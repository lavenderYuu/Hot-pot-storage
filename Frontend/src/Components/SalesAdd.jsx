import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [sales, setSales] = useState({
    date: Date.now(),
    itemName: "",
    amount: null,
    profit: null,
    branchNumber: null,
  });
  const handleChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[^\w\s]/gi, "");
    setSales((prev) => ({ ...prev, [e.target.name]: sanitizedValue }));
  };
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9900/sales", sales);
      console.log(response);
      if (response.data === "sales has been created successfully") {
        alert("Sales successfully added!");
      } else {
        alert(response.data.sqlMessage);
      }
      navigate("/sales");
    } catch (err) {
      alert(err.message);
      console.log(err);
      navigate("/sales");
    }
  };
  return (
    <div
      className="addSale"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1>Add new sales</h1>
      <input
        type="date"
        placeholder="YYYY-MM-DD"
        onChange={handleChange}
        name="date"
        style={{ margin: "20px", padding: "10px" }}
      />
      <input
        type="text"
        placeholder="Item Name"
        onChange={handleChange}
        name="itemName"
        style={{ margin: "20px", padding: "10px" }}
      />
      <input
        type="number"
        placeholder="Amount"
        onChange={handleChange}
        name="amount"
        style={{ margin: "20px", padding: "10px" }}
      />
      <input
        type="number"
        placeholder="Profit"
        onChange={handleChange}
        name="profit"
        style={{ margin: "20px", padding: "10px" }}
      />
      <select
        placeholder="Branch Number"
        onChange={(e) => handleChange(e)}
        name="branchNumber"
        style={{ margin: "20px", padding: "10px" }}
      >
        <option value="">Select Branch</option>
        <option value={3252}>3252</option>
        <option value={8204}>8204</option>
        <option value={1294}>1294</option>
        <option value={1332}>1332</option>
        <option value={3243}>3243</option>
      </select>

      <button onClick={handleClick} style={{ margin: "20px", padding: "10px" }}>
        Add
      </button>
    </div>
  );
};

export default Add;
