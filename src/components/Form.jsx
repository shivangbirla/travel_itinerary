import React, { useState, useEffect, useRef } from "react";
// import BasicOutput from "./BasicOutput";
import data from "../data/data";

const Form = () => {
  const [apiData, setApiData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [destination, setDestination] = useState("");
  const [numdays, setNumdays] = useState("");
  const [travelerType, setTravelerType] = useState("");
  const [tripPreferences, setTripPreferences] = useState("");
  // const [expectations, setExpectations] = useState("");

  const basicOutputRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      city: destination,
      num_days: parseInt(numdays),
      kind_of_traveller: travelerType,
      preferences: tripPreferences,
    };

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const resData = await response.json();
        console.log("Form submitted successfully:", resData);

        // Assuming resData has a structure similar to your sample data
        setApiData(resData[0]);

        // Scroll to BasicOutput
        scrollToBasicOutput();
      } else {
        throw new Error(`Error: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const scrollToBasicOutput = () => {
    // Check if basicOutputRef exists
    if (basicOutputRef.current) {
      basicOutputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // className="border-style w-[800px] mx-auto bg-white p-10 rounded-2xl shadow-lg"
  return (
    <div className="container mx-auto p-8 mt-10">
      <form
        onSubmit={handleFormSubmit}
        className="border-style w-[800px] mx-auto bg-white p-10 rounded-2xl"
      >
        <div className="mt-2 mb-4">
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-600"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="numdays"
            className="block text-sm font-medium text-gray-600"
          >
            Number of Days
          </label>
          <input
            type="text"
            id="numdays"
            name="numdays"
            value={numdays}
            onChange={(e) => setNumdays(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="travelerType"
            className="block text-sm font-medium text-gray-600"
          >
            What Kind of a Traveller are you?
          </label>
          <select
            id="travelerType"
            name="travelerType"
            value={travelerType}
            onChange={(e) => setTravelerType(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select...</option>
            <option value="adventure">adventure</option>
            <option value="luxury">cultural experiences</option>
            <option value="culture">relaxation</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="mb-12">
          <label
            htmlFor="tripPreferences"
            className="block text-sm font-medium text-gray-600"
          >
            Trip Preferences
          </label>
          <select
            id="tripPreferences"
            name="tripPreferences"
            value={tripPreferences}
            onChange={(e) => setTripPreferences(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select...</option>
            <option value="beach">solo traveller</option>
            <option value="mountains">couples</option>
            <option value="city">families</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* <div className="mb-4">
          <label
            htmlFor="expectations"
            className="block text-sm font-medium text-gray-600"
          >
            What are you expecting from your vacation?
          </label>
          <textarea
            id="expectations"
            name="expectations"
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
            rows="3"
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div> */}

        <div className="flex items-center justify-center ">
          <button
            type="submit"
            className="bg-[#1a659e] hover:bg-[#2c7da0] text-white py-2.5 px-6 rounded-md focus:outline-none text-[16px]"
          >
            Generate
          </button>
        </div>
      </form>

      {/* output-- */}
      <div className="mt-[300px] mx-auto">
        <h2 className="text-white text-[30px] text-center mb-6">
          Travel Itinerary
        </h2>
        <div
          ref={basicOutputRef}
          className="w-[1200px] mx-auto bg-white p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4 ml-2">Day 1</h2>
          {data.map((location, index) => (
            <div key={index} className="mb-6 p-4 border rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">{location.name}</h2>
              <p className="text-gray-600">{location.description}</p>
              <div className="flex justify-between mt-4">
                <div>
                  <p className="font-semibold">Open: {location.open}</p>
                </div>
                <div>
                  <p className="font-semibold">Close: {location.close}</p>
                </div>
                <div>
                  <p className="font-semibold">Price: {location.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
