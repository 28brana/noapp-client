import React, { useEffect, useState } from "react";
import { apiInstance } from "../api/api";

const PaginatedData = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(page, perPage);
  }, [page, perPage]);

  const fetchData = async (page, perPage) => {
    try {
      setIsLoading(true);
      const response = await apiInstance.get(
        `/user?page=${page}&perPage=${perPage}`
      );
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value, 10);
    if (newPerPage > 0) {
      setPage(1);
      setPerPage(newPerPage);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Paginated Data</h1>

      <div className="mb-4">
        <label className="mr-2">Items per page:</label>
        <select
          value={perPage}
          onChange={handlePerPageChange}
          className="border p-2"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      {isLoading ? (
        <div className="text-2xl py-10">🏃‍♂️loading ...</div>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.first_name}</td>
                <td className="border p-2">{item.last_name}</td>
                <td className="border p-2">{item.gender}</td>
                <td className="border p-2">{item.phone}</td>
                <td className="border p-2">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-300 py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedData;
