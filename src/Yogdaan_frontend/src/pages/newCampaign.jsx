import React, { useState } from "react";

const CreateCampaignPage = () => {
  const [ngoId, setNgoId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);
    setError(null);

    try {
      if (
        !ngoId ||
        !title ||
        !description ||
        !purpose ||
        !location ||
        !targetAmount ||
        !startDate ||
        !endDate
      ) {
        throw new Error("All fields are required");
      }

      const ngoIdNat = parseInt(ngoId, 10);
      const targetAmountNat = parseInt(targetAmount, 10);
      const startDateInt = new Date(startDate).getTime();
      const endDateInt = new Date(endDate).getTime();

      if (isNaN(ngoIdNat)) throw new Error("NGO ID must be a valid number");
      if (isNaN(targetAmountNat))
        throw new Error("Target amount must be a valid number");
      if (isNaN(startDateInt)) throw new Error("Start date is invalid");
      if (isNaN(endDateInt)) throw new Error("End date is invalid");
      if (startDateInt >= endDateInt)
        throw new Error("End date must be after start date");

      setTimeout(() => {
        setResult({ id: Math.floor(Math.random() * 1000) });
        setIsSubmitting(false);
      }, 1000);
    } catch (err) {
      setError({ message: err.message || "An error occurred" });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Campaign
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ngoId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              NGO ID
            </label>
            <input
              type="number"
              id="ngoId"
              value={ngoId}
              onChange={(e) => setNgoId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter NGO ID"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter campaign title"
            />
          </div>
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
            placeholder="Describe the campaign"
          />
        </div>

        <div>
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Purpose
          </label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What is the purpose of this campaign?"
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
            placeholder="Campaign location"
          />
        </div>

        <div>
          <label
            htmlFor="targetAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Target Amount
          </label>
          <input
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Funding goal amount"
            min="1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
        </button>
      </form>

      {/* Results display */}
      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h2 className="text-lg font-medium text-green-800">
            Campaign Created Successfully!
          </h2>
          <p className="text-green-700">Campaign ID: {result.id}</p>
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

export default CreateCampaignPage;
