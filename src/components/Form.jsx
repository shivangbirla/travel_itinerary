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
  const [optionsMeals, setOptionsMeals] = useState([]);
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
  const [selectedMeal, setSelectedMeal] = useState("");

  const basicOutputRef = useRef(null);

  const BASE_URL = "https://api.nutrichimp.zencoresolutions.co";

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
    if (
      event.key === "Enter" ||
      event.key === "Tab" ||
      event.charCode === 13 ||
      event.keyCode === 13
    ) {
      const newCuisine = event.target.value.trim();
      if (newCuisine) {
        setMoreCuisines((prevCuisines) => [...prevCuisines, newCuisine]);
        event.target.value = ""; // Clear the input after adding the cuisine
      }
      return;
    }
  };

  const getMealPlan = async () => {
    if (!selectedMeal) {
      alert("Please select a meal");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/generate_meal_by_name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedMeal,
        }),
      });

      // eslint-disable-next-line no-constant-condition
      if (response.ok) {
        const resData = await response.json();
        console.log("Form submitted successfully:", resData);

        const mealPlanString = resData?.meal;
        // const mealPlanString = ""
        try {
          const obj = JSON.parse(mealPlanString);
          console.log("first", obj);
          let ob = obj;
          while (!Object.keys(ob).includes("ingredients")) {
            ob = ob[Object.keys(ob)[0]];
          }
          console.log("first", obj, ob);

          setData(ob);
        } catch (error) {
          console.log(error);
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
      primary_cuisine: cuisines,
      other_cuisines: [moreCuisines],
      vegetarian: veg,
      food_items_to_exclude: foodItem,
      preferred_food_type: [type],
      allergies: [allergy],
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
        while (!Object.keys(ob).includes("day_1")) {
          console.log(ob);
          ob = ob[Object.keys(ob)[0]];
        }
        console.log(ob);
        // const mealPlanString = ""
        // console.log(mealPlanString);
        const allMeals = [];

        // Iterate through days and push all values to the single array
        for (const day in ob) {
          const meals = obj[day];
          allMeals.push(
            meals.breakfast,
            meals.lunch,
            meals.snack,
            meals.dinner
          );
        }
        setOptionsMeals(allMeals);

        console.log(allMeals);

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
        className="flex flex-col bg-[#1c8b65] gap-3 md:gap-4 border-style w-full xl:w-[800px] mx-auto   p-5 xl:p-10 rounded-2xl"
      >
        {/* <MultiSelect
          chips={cuisines}
          setChips={setCuisines}
          label={"Search A Primary Cuisines "}
          options={options?.cuisines}
          placeholder={"Search A Primary Cuisines"}
        />
        <MultiSelect
          chips={moreCuisines}
          setChips={setMoreCuisines}
          label={"Search A Secondary Cuisines "}
          options={options?.cuisines}
          placeholder={"Search A Primary Cuisines"}
        /> */}
        <Autocomplete
          label="Choose A Primary Cuisines"
          placeholder="Search A Primary Cuisines"
          className="min-w-xs "
          // color="white"
          value={cuisines}
          onSelectionChange={setCuisines}
        >
          {options?.cuisines?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Choose A Secondary Cuisines"
          placeholder="Search A Secondary Cuisines"
          className="min-w-xs"
          value={moreCuisines}
          onSelectionChange={setMoreCuisines}
        >
          {options?.cuisines?.map((countryy) => (
            <AutocompleteItem key={countryy} value={countryy}>
              {countryy}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <MultiSelect
          chips={foodItem}
          setChips={setFoodItem}
          label={"Choose A Food Item to Exclude"}
          options={options?.food_items}
          placeholder={"Choose A Food Item to Exclude"}
        />

        <Autocomplete
          label="Taste preference"
          placeholder="Choose a Taste preference"
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
          label="Is Meat Acceptable?"
          placeholder="Is Meat Acceptable?"
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
          label="Age (yrs)"
          placeholder="Pick an age group"
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
          label="Choose for Allergies"
          placeholder="Choose for Allergies"
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

        {/* <MultiSelect
          chips={allergy}
          setChips={setAllergy}
          label={"Search for Allergies "}
          options={options?.allergies}
          placeholder={"Search for Allergies"}
        /> */}

        <div className="flex items-center justify-center ">
          <button
            type="submit"
            className="bg-[#39ac23] flex items-center justify-center hover:bg-[#1cb457] w-full max-w-[700px] text-white py-2.5 px-6 rounded-md focus:bg-[#2c7da0] focus:outline-none text-[16px]   disabled:cursor-none"
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

      {/* {apiData && finalOptions && (
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
      )} */}

      {apiData && finalOptions && (
        <div className="mt-[150px] w-full xl:w-[900px] xl:mt-48 mx-auto">
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="min-w-[70px]">Day</TableColumn>
              <TableColumn>Breakfast</TableColumn>
              <TableColumn>Lunch</TableColumn>
              <TableColumn>Snack</TableColumn>
              <TableColumn>Dinner</TableColumn>
            </TableHeader>
            <TableBody>
              {Object.entries(apiData).map(([key, val], index) => (
                <TableRow key={index} className="text-gray-700">
                  <TableCell>
                    {key[0].toUpperCase() +
                      key.slice(1).split("_")[0] +
                      " " +
                      (index + 1)}
                  </TableCell>
                  <TableCell>{val.breakfast}</TableCell>
                  <TableCell>{val.lunch}</TableCell>
                  <TableCell>{val.snack}</TableCell>
                  <TableCell>{val.dinner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="w-full flex flex-col md:flex-row mt-14 gap-5">
            <Autocomplete
              label="Select a Meal"
              placeholder="Search an Meal"
              className="min-w-xs "
              value={selectedMeal}
              onSelectionChange={setSelectedMeal}
            >
              {optionsMeals?.map((meal) => (
                <AutocompleteItem key={meal} value={meal}>
                  {meal}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            <Button
              className="w-full max-w-[300px] mx-auto my-auto self-end"
              color="default"
              isLoading={isLoading}
              onClick={getMealPlan}
            >
              Generate How to make
            </Button>
          </div>
        </div>
      )}

      {data.ingredients && (
        <div className="w-full xl:w-[900px] mt-6 mx-auto" ref={basicOutputRef}>
          <InnerAccordianElement data={data} />
        </div>
      )}
    </div>
  );
};

export default Form;
