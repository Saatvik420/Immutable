import React, { useState, useContext } from "react";
import { ImmutableContext } from "../context/context";

const fetchFIR = () => {
  const { fetchComplaint } = useContext(ImmutableContext);

  const [txHash, setTxHash] = useState("");
  const [complaint, setComplaint] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedComplaint = await fetchComplaint(txHash);
      setComplaint(fetchedComplaint);
    } catch (error) {
      console.error("Error fetching complaint:", error);
    }
  };

  return (
    <div className="text-white py-8 px-4 min-h-screen">
      <h2 className="text-2xl mb-4">Fetch Complaint</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2 text-white">
          Transaction Hash:
          <input
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            className="glassmorphism border-gray-600 text-gray-500 rounded px-3 py-2 w-full mt-1"
          />
        </label>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
        >
          Fetch FIR
        </button>
      </form>
      {complaint && (
        <div>
          <p className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 m-2">
             {complaint.complainant}
          </p>
          <label className="block mb-2">Name:</label>
          <p className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 m-2"> {complaint.name}</p>
          <label className="block mb-2">Contact:</label>
          <p className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 m-2"> {complaint.contact}</p>
          <label className="block mb-2">Location:</label>
          <p className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 m-2"> {complaint.location}</p>
          <label className="block mb-2">Timestamp:</label>
          <p className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 m-2"> {complaint.timestamp}</p>
          <label className="block mb-2">Description:</label>
          <p className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 m-2"> {complaint.description}</p>
          <label className="block mb-2">Evidence CID:</label>
          <p className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 m-2"> {complaint.evidenceId}</p>
        </div>
      )}
    </div>
  );
};

export default fetchFIR;
