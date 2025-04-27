import { type LoaderFunctionArgs, data } from "react-router";
import { getAllTrips } from "~/appwrite/trips";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);

    const limit = 10;
    const offset = (page - 1) * limit;

    const { allTrips, total } = await getAllTrips(limit, offset);

    const trips = allTrips.map(({ tripDetails, imageUrls }) => ({
      details: JSON.parse(tripDetails),
      images: imageUrls,
    }));

    return data({
      by: "Tourvisto",
      trips,
      total,
    });
  } catch (error: any) {
    console.error("Error while fetching trips: ", error);
  }
};
