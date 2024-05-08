import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import "./sales.css";
const Sales = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:9900/sales");
      setData(result.data);
      setFilteredData(result.data);
    };
    fetchData();
  }, []);

  const fetchMaxProfitItem = async () => {
    try {
      const result = await axios.get("http://localhost:9900/sales/minProfit");
      setFilteredData(result.data);
    } catch (error) {
      console.error("Error fetching min profit item:", error);
    }
  };
  const fetchMaxTotalProfitDay = async () => {
    try {
      const result = await axios.get(
        "http://localhost:9900/sales/maxTotalProfit"
      );
      setFilteredData(result.data);
    } catch (error) {
      console.error("Error fetching max total profit day:", error);
    }
  };

  const [selectedBranch, setSelectedBranch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchValues = selectedBranch.map((branch) => branch.value); // Extracting only the values
        console.log(branchValues);
        const result = await axios.get("http://localhost:9900/sales/branch", {
          params: {
            branches: branchValues,
          },
        });
        setFilteredData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedBranch.length > 0) {
      fetchData();
    }
  }, [selectedBranch]);

  const options = [
    { value: 3252, label: "3252" },
    { value: 8204, label: "8204" },
    { value: 1294, label: "1294" },
    { value: 1332, label: "1332" },
    { value: 3243, label: "3243" },
  ];

  return (
    <div>
      <h1>Sales Table</h1>

      <div style={{ marginBottom: "10px" }}>
        <h3 htmlFor="branch-select" style={{ marginBottom: "10x" }}>
          Select Branch:
        </h3>
        <MultiSelect
          className="dark"
          options={options}
          value={selectedBranch}
          onChange={setSelectedBranch}
          labelledBy="Select"
        />
      </div>
      <div>
        <button className="saleAddButt" style={{ padding: "5px 10px" }}>
          <Link to="/saleAdd">Add new Sale</Link>
        </button>

        <button
          onClick={fetchMaxProfitItem}
          style={{ padding: "5px 10px", marginLeft: "10px" }}
        >
          Find min profit item
        </button>

        <button
          onClick={fetchMaxTotalProfitDay}
          style={{ padding: "5px 10px", marginLeft: "10px" }}
        >
          Find max total profit day
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          style={{
            margin: "20px",
            borderCollapse: "separate",
            borderSpacing: "10px",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "5px 10px" }}>Date</th>
              <th style={{ padding: "5px 10px" }}>Item Name</th>
              <th style={{ padding: "5px 10px" }}>Amount</th>
              <th style={{ padding: "5px 10px" }}>Profit</th>
              <th style={{ padding: "5px 10px" }}>Branch Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "0px 10px" }}>
                  {new Date(item.date).toISOString().split("T")[0]}
                </td>
                <td>{item.sales_item_name || "total"}</td>
                <td>{item.amount}</td>
                <td>{item.profit}</td>
                <td>{item.branch_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
