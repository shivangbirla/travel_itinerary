import React, { useState, useEffect, useRef } from "react";
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";

// import BasicOutput from "./BasicOutput";
import data from "../data/data";
import { Input } from "@nextui-org/react";

const Form = () => {
  const [apiData, setApiData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [country, setcountry] = useState("");
  const [numdays, setNumdays] = useState("");
  const [travelerType, setTravelerType] = useState("");
  const [tripPreferences, setTripPreferences] = useState("");
  const [options, setOptions] = useState([]);
  const [cuisines, setCuisines] = useState();
  const [moreCuisines, setMoreCuisines] = useState([]);
  const [age, setAge] = useState();
  const [veg, setVeg] = useState();
  const [allergy, setAllergy] = useState();
  const [item, setItem] = useState();
  const [type, settype] = useState();

  const basicOutputRef = useRef(null);

  const fetchOptions = async () => {
    try {
      const response = await fetch("http://localhost:8000/getAllOptions");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOptions(data);
      } else {
        throw new Error(`Error: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error fetching options:", error.message);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleKeyDown = (event) => {
    // event.preventDefault();
    if (event.key === "Enter") {
      const newCuisine = event.target.value.trim();
      if (newCuisine) {
        setMoreCuisines((prevCuisines) => [...prevCuisines, newCuisine]);
        event.target.value = ""; // Clear the input after adding the cuisine
      }
      return;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      country: country,
      primary_cuisine: cuisines,
      other_cuisines: moreCuisines,
      vegetarian: veg,
      food_items_to_exclude: [item],
      preferred_food_type: [type],
      allergies: [allergy],
      age,
    };

    console.log(requestBody)

    try {
      const response = await fetch("http://localhost:8000/generate_meal_plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const resData = await response.json();
        console.log("Form submitted successfully:", resData);

        // Assuming resData has a structure similar to your sample data
        // setApiData(resData[0]);

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

  const handleChipClose = (indexToRemove) => {
    setMoreCuisines((prevCuisines) =>
      prevCuisines.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Prevent form submission when Enter is pressed in the input field
    }
  };
  console.log("country", country);
  return (
    <div className="container mx-auto p-8">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 border-style w-full xl:w-[800px] mx-auto  bg-slate-700 p-10 rounded-2xl"
      >
        <Autocomplete
          label="Country"
          color={"default"}
          placeholder="Search an country"
          className="min-w-xs "
          value={country}
          onSelectionChange={setcountry}
        >
          {options?.countries?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Cuisine"
          placeholder="Search an Cuisine"
          className="min-w-xs"
          value={cuisines}
          onSelectionChange={setCuisines}
        >
          {options?.cuisines?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <div className="bg-default-100 relative py-2 px-3 flex flex-col min-h-[56px] rounded-medium">
          <label
            htmlFor="numdays"
            className=" z-10 pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-xs group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden"
          >
            Other Cuisines
          </label>
          <div className="flex flex-row  flex-wrap gap-2">
            {/* <Chip onClose={() => {}} variant="flat">
            Chip
          </Chip> */}
            {moreCuisines.map((cuisine, index) => (
              <Chip
                onClose={() => {
                  handleChipClose(index);
                }}
                variant="flat"
                key={cuisine}
              >
                {cuisine}
              </Chip>
            ))}

            <input
              type="text"
              className="bg-inherit outline-none border-none ring-none w-fit min-w-[150px] placeholder:text-foreground-500 text-foreground-600 font-normal text-small"
              placeholder="Enter Cuisine"
              onKeyDown={(e) => {
                handleKeyDown(e);
                handleInputKeyDown(e)
              }}
            />
          </div>
        </div>
        <Autocomplete
          label="Food Item"
          placeholder="Search an Food Item"
          className="min-w-xs"
          value={item}
          onSelectionChange={setItem}
        >
          {options?.food_items?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Food Type"
          placeholder="Search an Food Type"
          className="min-w-xs"
          value={type}
          onSelectionChange={settype}
        >
          {options?.food_types?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Veg/Non-Veg"
          placeholder="Search an Veg"
          className="min-w-xs"
          value={veg}
          onSelectionChange={setVeg}
        >
          {options?.vegetarian?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Age"
          placeholder="Search an Age"
          className="min-w-xs"
          value={age}
          onSelectionChange={setAge}
        >
          {options?.age?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Allergies"
          placeholder="Search an Allergies"
          className="min-w-xs"
          value={allergy}
          onSelectionChange={setAllergy}
        >
          {options?.allergies?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        {/* <div className="">
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
            onClick={handleFormSubmit}
          >
            Generate
          </button>
        </div>
      </form>

      {/* output-- */}
      <div className="mt-[150px] xl:mt-48 mx-auto">
        <h2 className="text-white text-[30px] text-center mb-6">
          Travel Itinerary
        </h2>
        <div
          ref={basicOutputRef}
          className=" w-full xl:w-[1200px] mx-auto bg-white p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl font-semibold  ml-2">Day 1</h2>
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
