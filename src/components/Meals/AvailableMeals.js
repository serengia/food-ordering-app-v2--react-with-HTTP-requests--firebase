import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import s from "./AvailableMeals.module.css";
import MealItem from "./MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const formatFirebaseData = (data) => {
  const formatedData = [];
  for (const key in data) {
    formatedData.push({
      id: key,
      name: data[key]["name"],
      description: data[key]["description"],
      price: data[key]["price"],
    });
  }

  return formatedData;
};

function AvailableMeals() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://react-simple-food-app-default-xyz.firebaseio.com/meals.json"
        );

        if (response.status === 404) {
          throw new Error("Resource not found (404).");
        }

        const data = await response.json();

        const formatedData = formatFirebaseData(data);

        setData(formatedData);
      } catch (error) {
        console.log("Error fetching data.");
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className={s.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          {data.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
