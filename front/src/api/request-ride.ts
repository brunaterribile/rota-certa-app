import { api } from "../lib/axios";

export interface RequestRideBody {
  customer_id: string;
  origin: string;
  destination: string;
}

interface RequestRideResponse {
  customer_id: string;
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: [
    {
      id: number;
      name: string;
      description: string;
      vehicle: string;
      review: {
        rating: number;
        comment: string;
      };
      value: number;
    }
  ];
  routeResponse: object;
}

export async function requestRide(
  body: RequestRideBody
): Promise<RequestRideResponse> {
  const response = await api.post("/ride/estimate", body);

  return response.data;
}
