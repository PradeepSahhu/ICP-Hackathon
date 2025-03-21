import React, { useState } from "react";
import { Yogdaan_backend } from "../../../declarations/Yogdaan_backend";

const NGOForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const createNewNGO = async (e) => {
    e.preventDefault();
    try {
      const res = Yogdaan_backend.createNGO(name, description, location);
    } catch (error) {
      console.log(console.error());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);
    setError(null);

    try {
      if (name && description && location) {
        setResult({ id: Math.floor(Math.random() * 1000) });
      } else {
        setError({ message: "All fields are required" });
      }
      setIsSubmitting(false);
    } catch (err) {
      setError({ message: err.message || "An error occurred" });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-20">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New NGO</h1>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            NGO Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter NGO name"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the NGO's mission"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="NGO's primary location"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          onClick={(e) => createNewNGO(e)}
        >
          {isSubmitting ? "Creating..." : "Create NGO"}
        </button>
      </form>

      {/* Results display */}
      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h2 className="text-lg font-medium text-green-800">
            NGO Created Successfully!
          </h2>
          <p className="text-green-700">Your NGO ID: {result.id}</p>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-medium text-red-800">Error</h2>
          <p className="text-red-700">{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default NGOForm;
