import { api } from "../lib/axios";

export async function confirmRide() {
    await api.get('/ride/confirm')
}
