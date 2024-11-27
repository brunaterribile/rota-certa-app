import { api } from "../lib/axios";

export interface ConfirmRideBody {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
        id: number;
        name: string;
    };
    value: number;
}

interface ConfirmRideResponse {
    success: boolean;
}

export async function confirmRide(body: ConfirmRideBody): Promise<ConfirmRideResponse> {
    const response = await api.patch('/ride/confirm', body)

    return response.data
}
