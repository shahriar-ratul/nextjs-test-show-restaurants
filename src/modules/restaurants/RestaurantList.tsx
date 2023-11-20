/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { RestaurantData } from "@/interface/RestaurantData";
import axios from "axios";
import ShowDataRestaurant from "@/components/restaurant/ShowDataRestaurant";

const RestaurantList: React.FC = () => {
  const [items, setItems] = useState<RestaurantData[]>([]);

  const fetchData = async () => {
    const { data } = await axios.get("/api/restaurants", {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data;
  };

  const { isLoading, isError, error } = useQuery<boolean, any>({
    queryKey: ["restaurant-list"],
    queryFn: async () => {
      const response = await fetchData();
      // console.log(response)
      const sortedRestaurants: RestaurantData[] = response
        .slice()
        .sort((a: { state: string }, b: { state: any }) =>
          a.state.localeCompare(b.state)
        );

      setItems(sortedRestaurants);

      return response;
    }
  });

  if (isError) return "An error has occurred: " + error.message;
  if (isLoading) return "loading ....";

  return (
    <>
      <div>
        {items.length > 0 && <ShowDataRestaurant restaurants={items} />}
      </div>
    </>
  );
};

export default RestaurantList;
