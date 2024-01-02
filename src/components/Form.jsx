import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Popover,
  PopoverContent,
} from "@nextui-org/react";
import fs from "fs";
// import BasicOutput from "./BasicOutput";
import data from "../data/data";
import { Input } from "@nextui-org/react";
import MultiSelect from "./MultiSelect";
// import { useAuth0 } from "@auth0/auth0-react";
import InnerAccordianElement from "./InnerAccordianElement";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const Form = () => {
  // const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [apiData, setApiData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [country, setcountry] = useState([]);
  const [numdays, setNumdays] = useState("");
  const [travelerType, setTravelerType] = useState("");
  const [tripPreferences, setTripPreferences] = useState("");
  const [options, setOptions] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [moreCuisines, setMoreCuisines] = useState([]);
  const [age, setAge] = useState();
  const [veg, setVeg] = useState();
  const [allergy, setAllergy] = useState([]);
  const [type, settype] = useState();
  const [loading, setLoading] = useState(false);
  const [foodItem, setFoodItem] = useState([]);
  const [foodItemInput, setFoodItemInput] = useState("");
  const [finalOptions, setFinalOptions] = useState();
  const [data, setData] = useState({});

  const basicOutputRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_SERVER_URI;

  //  const BASE_URL = "https://generative-travel-itinerary.vercel.app";

  const fetchOptions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAllOptions`);
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

  const getMealPlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/get_final_meal_plan`, {
        method: "GET",
       
      });

      // eslint-disable-next-line no-constant-condition
      if (response.ok) {
        const resData = await response.json();
        console.log(
          "Form submitted successfully:",
          resData,
          resData?.meal_plan?.recipes_and_ingredients
        );

        const mealPlanString = resData?.meal_plan?.recipes_and_ingredients;
        // const mealPlanString = ""
        try {
          const obj = JSON.parse(mealPlanString);
          console.log("first", obj);
          let ob = obj;
          while (!Object.keys(ob).includes("breakfast")) {
            ob = ob[Object.keys(ob)[0]];
          }
          console.log("first", obj, ob);
          setData(ob);
        } catch (error) {
          console.log(error)
        }
        
      } else {
        // throw new Error(`Error: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(data);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // if(!isAuthenticated){
    //   loginWithRedirect();
    //   return;
    // }

    const requestBody = {
      country: country[0],
      primary_cuisine: cuisines[0],
      other_cuisines: moreCuisines,
      vegetarian: veg,
      food_items_to_exclude: foodItem,
      preferred_food_type: [type],
      allergies: allergy,
      age,
    };


    try {
      const response = await fetch(`${BASE_URL}/generate_meal_plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // eslint-disable-next-line no-constant-condition
      if (response.ok) {
        const resData = await response.json();

        const mealPlanString = resData;

        const obj = JSON.parse(mealPlanString?.meal_plan?.dish_names);

        let ob = obj;
        while (!Object.keys(ob).includes("breakfast")) {
          ob = ob[Object.keys(ob)[0]];
        }
        // const mealPlanString = ""
        // console.log(mealPlanString);

        setApiData(ob);
        setFinalOptions(requestBody);

        scrollToBasicOutput();
      } else {
        // throw new Error(`Error: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setLoading(false);
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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-3 md:gap-4 border-style w-full xl:w-[800px] mx-auto  bg-slate-700 p-5 xl:p-10 rounded-2xl"
      >
        {/* <Autocomplete
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
        </Autocomplete> */}
        <MultiSelect
          chips={country}
          setChips={setcountry}
          label={"Search A Country "}
          options={options?.countries}
          placeholder={"Search A Country"}
        />
        <MultiSelect
          chips={cuisines}
          setChips={setCuisines}
          label={"Search A Cuisines "}
          options={options?.cuisines}
          placeholder={"Search A Cuisines"}
        />
        {/* <Autocomplete
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
        </Autocomplete> */}

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
                handleInputKeyDown(e);
              }}
            />
          </div>
        </div>
        <MultiSelect
          chips={foodItem}
          setChips={setFoodItem}
          label={"Search A Food Item to Exclude"}
          options={options?.food_items}
          placeholder={"Search A Food Item to Exclude"}
        />

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
        {/* <Autocomplete
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
        </Autocomplete> */}

        <MultiSelect
          chips={allergy}
          setChips={setAllergy}
          label={"Search for Allergies "}
          options={options?.allergies}
          placeholder={"Search for Allergies"}
        />

        <div className="flex items-center justify-center ">
          <button
            type="submit"
            className="bg-[#1a659e] flex items-center justify-center hover:bg-[#2c7da0] w-full max-w-[700px] text-white py-2.5 px-6 rounded-md focus:outline-none text-[16px]  disabled:cursor-none"
            onClick={(e) => {
              handleFormSubmit(e);
              setLoading(true);
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                classNames={{
                  svg: " drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-white",
                }}
              />
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </form>

      {/* output-- */}
      {apiData && finalOptions && (
        <div className="mt-[150px] xl:mt-48 mx-auto">
          <h2 className="text-white text-[30px] text-center mb-6">
            Nutri-Chimp
          </h2>
          <div className="w-full  xl:w-[900px] mx-auto">
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Meal</TableColumn>
                <TableColumn>Recipe</TableColumn>
              </TableHeader>
              <TableBody>
                {Object.entries(apiData).map(([key, value], index) => (
                  <TableRow key={index} className="text-gray-100">
                    <TableCell>{key[0].toUpperCase() + key.slice(1)}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="w-full flex items-center justify-center my-4 xl:w-[900px]">
            <Button
              className=" mx-auto mt-4 self-end"
              color="default"
              isLoading={isLoading}
              onClick={getMealPlan}
            >
              Generate How to make
            </Button>
          </div>
        </div>
      )}

      {
        <div className="w-full xl:w-[900px] mt-6 mx-auto" ref={basicOutputRef}>
          <Accordion variant="splitted">
            {Object.entries(data).map(([key, value], index) => (
              <AccordionItem
                key={index}
                aria-label="Accordion 1"
                title={value.name}
                subtitle={key[0].toUpperCase() + key.slice(1)}
                className="text-gray-400"
              >
                <InnerAccordianElement data={value} />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      }
    </div>
  );
};

export default Form;
