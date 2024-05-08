import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DrinkStorage = () => {
  const [storages, setStorages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrinkStorage = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:9900/drink-storage");
        setStorages(response.data);
      } catch (error) {
        console.error("Error fetching drink storages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrinkStorage();
  }, []);

  if (isLoading) {
    return <div>Loading storages...</div>;
  }

  return (
    <div>
      <h1>Drink Storage List</h1>
      <table>
        <thead>
          <tr>
            <th>Storage Name</th>
            <th>Branch Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storages.map((storage) => (
            <tr key={`${storage.storage_name}-${storage.branch_number}`}>
              <td>{storage.storage_name}</td>
              <td>{storage.branch_number}</td>
              <td>
                <Link
                  to={`/drink-storage/${encodeURIComponent(
                    storage.branch_number
                  )}/${encodeURIComponent(storage.storage_name)}/drinks`}
                >
                  View Drinks
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrinkStorage;
