import React, { useState, useContext } from "react";
import { ImmutableContext } from "../context/context";
import UploadEvidence from "../components/UploadEvidence";

const FileFIR = () => {
  const { fileComplaint } = useContext(ImmutableContext);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceId, setEvidenceId] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    fileComplaint(
      name,
      contact,
      location,
      description,
      evidenceId,
      (receipt) => {
        // Transaction successfully mined
        const { returnValues } = receipt.events.ComplaintFiled;
        const { txHash: eventTxHash } = returnValues;
        setTxHash(eventTxHash);
        console.log(receipt);
      }
    );
  };

  return (
    <div className="text-white py-8 px-4 min-h-screen">
      <div>
        <UploadEvidence />
      </div>
      <div>
        <h2 className="text-2xl mb-4">File Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Evidence CID:</label>
            <input
              type="text"
              value={evidenceId}
              onChange={(e) => setEvidenceId(e.target.value)}
              className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2 w-full mt-1"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
          >
           File FIR
          </button>
        </form>
        {txHash && (
          <div className="mt-4">
            <h3 className="text-xl mb-2">Transaction Hash:</h3>
            <p className="glassmorphism border border-gray-600 text-gray-500 rounded px-3 py-2">
              {txHash}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileFIR;
