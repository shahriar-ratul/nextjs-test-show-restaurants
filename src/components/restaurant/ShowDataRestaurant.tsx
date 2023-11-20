/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";

interface Restaurant {
  restaurant_name: string;
  state: string;
}

interface GroupedRestaurantsProps {
  restaurants: Restaurant[];
}

const ShowDataRestaurant: React.FC<GroupedRestaurantsProps> = ({
  restaurants
}) => {
  // Group the restaurants by state
  const groupedRestaurants: Record<string, string[]> = restaurants.reduce<
    Record<string, string[]>
  >((acc, restaurant) => {
    const { state, restaurant_name } = restaurant;
    if (!acc[state]) {
      acc[state] = [];
    }
    acc[state].push(restaurant_name);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedRestaurants).map(state => (
        <ul key={state}>
          <li>{state}</li>
          <ul>
            {groupedRestaurants[state].map((restaurant, index) => (
              <li key={index}>{restaurant}</li>
            ))}
          </ul>
        </ul>
      ))}
    </div>
  );
};

export default ShowDataRestaurant;
