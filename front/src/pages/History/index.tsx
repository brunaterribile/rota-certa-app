import { FormContainer, HistoryContainer, HistoryList, RequestHistoryButton } from "./styles";
import { useForm } from "react-hook-form";
import { getHistory } from "../../api/get-history";
import { toast } from "sonner";
import { useState } from "react";
import { formatDateTime } from "../../utils/format-datetime";
import { formatDuration } from "../../utils/format-duration";
import { AxiosError } from "axios";

type RequestHistoryForm = {
    customer_id: string;
    driver_id?: string;
}

type Ride = {
    id: number;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
        id: number;
        name: string;
    };
    value: number;
};

export function History() {
    const { register, handleSubmit, formState: { isSubmitting} } = useForm<RequestHistoryForm>()
    const [rides, setRides] = useState<Ride[]>([])

    async function handleForm(data: RequestHistoryForm) {
        try {
            const response = await getHistory(data.customer_id, data.driver_id)
            setRides(response.data.rides)
        } catch (error) {
            if (error instanceof AxiosError && error?.response?.data?.error_description) {
                toast.error(error.response.data.error_description);
            } else {
                toast.error('Ocorreu um erro inesperado');
            }
        }
    }

    return (
        <HistoryContainer>
            <h2> Histórico de viagens </h2>
            <form onSubmit={handleSubmit(handleForm)}>
                <FormContainer>
                    <label htmlFor="customer_id">Id do usuário</label>
                    <input 
                        id="customer_id"
                        {...register("customer_id", { required: "O ID do usuário é obrigatório" })} 
                    />

                    <label htmlFor="driver">Motorista</label>
                    <select id="driver" {...register("driver_id")}>
                        <option value="">Todos os motoristas</option>
                        <option value="1">Homer Simpson</option>
                        <option value="2">Dominic Toretto</option>
                        <option value="3">James Bond</option>
                    </select>
                    <RequestHistoryButton type="submit" disabled={isSubmitting}>
                        Buscar viagens
                    </RequestHistoryButton>
                </FormContainer>
            </form>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Origem</th>
                            <th>Destino</th>
                            <th>Data</th>
                            <th>Motorista</th>
                            <th>Distância</th>
                            <th>Tempo</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides.map((ride) => (
                            <tr key={ride.id}>
                                <td>{ride.origin}</td>
                                <td>{ride.destination}</td>
                                <td>{formatDateTime(ride.date)}</td>
                                <td>{ride.driver.name}</td>
                                <td>{ride.distance.toFixed(1)} km</td>
                                <td>{formatDuration(ride.duration)}</td>
                                <td>R$ {ride.value.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
