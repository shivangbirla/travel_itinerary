import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
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
import { useAuth0 } from "@auth0/auth0-react";

const Form = () => {
   const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [apiData, setApiData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

  const basicOutputRef = useRef(null);
  console.log(apiData);

  const BASE_URL = "http://127.0.0.1:8000";
  //  const BASE_URL = "https://generative-travel-itinerary.vercel.app";

  const obj = {
    breakfast: {
      dish_name: "Power Packed Paratha",
      recipe:
        "Power Packed Paratha is a nutritious and delicious Indian breakfast dish. It is made by stuffing a combination of grated vegetables and spices into a whole wheat dough. Here's the recipe:\n1. In a bowl, mix together 1 cup whole wheat flour, 1/2 cup grated carrots, 1/2 cup grated cauliflower, 1/4 cup chopped spinach, 1/4 cup finely chopped onions, 1/2 teaspoon ginger-garlic paste, 1/2 teaspoon cumin powder, 1/4 teaspoon turmeric powder, 1/4 teaspoon red chili powder, and salt to taste.\n2. Gradually add water to the mixture and knead it into a smooth dough.\n3. Divide the dough into small portions and roll out each portion into a small circle.\n4. Heat a non-stick pan and cook the paratha on both sides until golden brown, using a little oil if needed.\n5. Serve the Power Packed Paratha with a side of fresh yogurt or tomato chutney.",
    },
    lunch: {
      dish_name: "Kid's Favorite Vegetable Biryani",
      recipe:
        "Kid's Favorite Vegetable Biryani is a flavorful and nutritious rice dish that incorporates a variety of vegetables and aromatic spices. Here's how you can make it:\n1. Heat 2 tablespoons of oil in a pan and add 1 teaspoon cumin seeds, 2-3 cloves, 2-3 green cardamom pods, 1-inch cinnamon stick, and a bay leaf. Sauté for a minute until fragrant.\n2. Add 1 finely chopped onion and cook until golden brown.\n3. Add 1 tablespoon ginger-garlic paste and cook for a minute.\n4. Add 1/2 cup mixed vegetables (such as peas, carrots, beans) and sauté for a few minutes.\n5. Add 1 cup soaked basmati rice and mix well.\n6. Add 2 cups water, salt to taste, and a pinch of saffron strands (dissolved in 1 tablespoon milk). Stir gently.\n7. Cover the pan and let it simmer for about 15-20 minutes until the rice is cooked and the flavors are well combined.\n8. Garnish with fried onions, chopped coriander leaves, and roasted cashews.\nServe the Kid's Favorite Vegetable Biryani with cucumber raita and a side of salad.",
    },
    snack: {
      dish_name: "Cheesy Veggie Toast",
      recipe:
        "Cheesy Veggie Toast is a quick and healthy snack option for kids. Here's how you can make it:\n1. Take whole wheat bread slices and lightly toast them.\n2. In a bowl, mix together 1/2 cup grated cheese, 1/4 cup finely chopped bell peppers, 1/4 cup grated zucchini, and a pinch of black pepper.\n3. Spread the cheese and vegetable mixture evenly on the toasted bread slices.\n4. Place the slices under the broiler for a few minutes until the cheese melts and turns golden brown.\n5. Cut the toast into small triangles or any desired shape.\nServe the Cheesy Veggie Toast with a glass of freshly squeezed orange juice or a fruit smoothie.",
    },
    dinner: {
      dish_name: "Creamy Spinach Pasta",
      recipe:
        "Creamy Spinach Pasta is a delicious and nutritious dinner option for kids. Here's the recipe:\n1. Cook 1 cup whole wheat pasta according to package instructions until al dente. Drain and set aside.\n2. Heat 1 tablespoon olive oil in a pan and add 2 cloves of minced garlic. Sauté for a minute.\n3. Add 2 cups chopped spinach and cook until wilted.\n4. In a blender, combine 1/2 cup soaked cashews, 1/2 cup unsweetened almond milk, 1 tablespoon nutritional yeast, and salt to taste. Blend until smooth and creamy.\n5. Pour the creamy sauce over the cooked spinach and mix well.\n6. Add the cooked pasta to the sauce and toss until evenly coated.\n7. Garnish with chopped fresh basil leaves and a sprinkle of grated cheese (optional).\nServe the Creamy Spinach Pasta with a side of steamed vegetables.",
    },
  };

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!isAuthenticated){
      loginWithRedirect();
      return;
    }

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

    console.log(requestBody);

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
        console.log("Form submitted successfully:", resData, resData.meal_plan);

        // Assuming resData has a structure similar to your sample data
        // setApiData(resData[0]);

        // Scroll to BasicOutput
        const mealPlanString = resData.meal_plan;
        // const mealPlanString = ""
        console.log(mealPlanString);
        // const days = mealPlanString.split("Day");
        // const mealPlan = days.slice(1).map((day, index) => {
        //   const [dayNum, ...meals] = day.trim().split(/\r?\n(?=-)/); // Split by new line followed by -
        //   const formattedMeals = meals.map((meal) => {
        //     const [mealTime, mealContent] = meal.split(":");
        //     const [mealName, ...details] = mealContent.split("- Ingredients:");
        //     const ingredients = details[0]
        //       .split("- Recipe:")[0]
        //       .trim()
        //       .split(", ");
        //     const steps = details[0]
        //       .split("- Recipe:")[1]
        //       .trim()
        //       .split(/\d+\./)
        //       .slice(1)
        //       .map((step) => step.trim());

        //     return {
        //       mealTime: mealTime.trim(),
        //       mealName: mealName.trim(),
        //       ingredients,
        //       steps,
        //     };
        //   });

        //   return {
        //     day: `Day ${index + 1}`,
        //     meals: formattedMeals,
        //   };
        // });

        setApiData(JSON.parse(mealPlanString));

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

  // handle food item function

  //  const handleInputKeyDownFoodItem = (event) => {
  //    if (event.key === "Enter") {
  //      event.preventDefault();
  //      // Prevent form submission when Enter is pressed in the input field
  //    }
  //  };

  console.log("country", country);
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
      {apiData && (
        <div className="mt-[150px] xl:mt-48 mx-auto">
          <h2 className="text-white text-[30px] text-center mb-6">
            Nutri-Chimp
          </h2>
          <div className="w-full xl:w-[900px] mx-auto" ref={basicOutputRef}>
            <Accordion variant="splitted">
              {Object.entries(apiData).map(([key, value], index) => (
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title={value?.dish_name}
                  subtitle={key[0].toUpperCase() + key.slice(1)}
                  className="text-gray-400"
                >
                  <ol>
                    {value?.recipe.split(". ").map((item, index) => {
                      const step = item.replace(/\d+\s*$/, ""); // Remove trailing numbers
                      return (
                        <li key={index}>
                          {index>0&&<span>{index }. </span>}{" "}
                          {/* Display step numbers */}
                          {step}
                          {index===0 && ":"}
                        </li>
                      );
                    })}
                  </ol>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
