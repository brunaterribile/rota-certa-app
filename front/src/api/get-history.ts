import { api } from "../lib/axios";

export async function getHistory(customer_id: string, driver_id?: string) {
    const url = `/ride/${customer_id}${driver_id ? `?driver_id=${driver_id}` : ''}`;
    return await api.get(url);
}
