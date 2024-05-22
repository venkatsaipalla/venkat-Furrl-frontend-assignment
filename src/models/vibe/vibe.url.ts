import axios from "axios";
import { ListingProductsResponse } from "@/models/vibe/vibe.interface";

export const getVibesData = async (pageNumber?: number): Promise<ListingProductsResponse> => {
  try {
    const { data } = await axios.post<ListingProductsResponse>(
      `https://api.furrl.in/api/v2/listing/getListingProducts`,
      { input: { entity: "vibe", id: "#HomeHunts" } },
      {
        params: {
          page: pageNumber || 1,
        },
      }
    );
    return data;
  } catch (error) {
    // make a call to the logger service
    console.log("error fetching data: ", error);
    throw new Error("Error fetching data");
  }
};

export const getVibeByNamee = async (pageNumber?: number) => {
  try {
    const { data } = await axios.post(
      `https://api.furrl.in/api/v2/listing/getVibeByName`,
      { name: "#HomeHunts" }
      // {
      //   params: {
      //     page: pageNumber || 1,
      //   },
      // }
    );
    return data && data.data;
  } catch (error) {
    // make a call to the logger service
    console.log("error fetching data: ", error);
    throw new Error("Error fetching data");
  }
};
