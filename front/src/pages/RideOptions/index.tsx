import { useLocation, useNavigate } from "react-router-dom";
import { DriversList, MapBox, OptionsBox, OptionsContainer, RequestDriverButton } from "./styles";
import { useState } from "react";
import { confirmRide, ConfirmRideBody } from "../../api/confirm-ride";
import { toast } from "sonner";
import { useCustomer } from "../../contexts/CustomerContext";

type Driver = {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string
    };
    value: number;
}

type LocationState = {
    options: Driver[];
    origin: string;
    destination: string;
    distance: number;
    duration: string;
};

export function RideOptions() {
    const location = useLocation()  
    const navigate = useNavigate()
    const { origin, destination, customer_id } = useCustomer();
    const { options, distance, duration } = location.state as LocationState

    const [loading, setLoading] = useState<boolean>(false);

    async function handleConfirmRide(driver: Driver) {
        setLoading(true);
        
        const confirmData: ConfirmRideBody = {
            customer_id,
            origin,
            destination,
            distance,
            duration,
            driver: {
                id: driver.id,
                name: driver.name,
            },
            value: driver.value,
        };

        try {
            const response = await confirmRide(confirmData);
            if (response.success) {
                navigate('/history');
            } else {
                toast.error("Erro ao confirmar a viagem!");
            }
        } catch (error) {
            toast.error("Erro ao confirmar a viagem!");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <OptionsContainer>
            <h2> Escolha uma das opções de viagem: </h2>
            <OptionsBox>
                <DriversList>
                    <table>
                    <thead>
                        <tr>
                            <th>Motorista</th>
                            <th>Descrição</th>
                            <th>Veículo</th>
                            <th>Avaliações</th>
                            <th>Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                        <tbody>
                            {options?.map((option) => (
                                <tr key={option.id}>
                                    <td>{option.name}</td>
                                    <td>{option.description}</td>
                                    <td>{option.vehicle}</td>
                                    <td>{option.review.rating}/5 "{option.review.comment}"</td>
                                    <td>R$ {option.value}</td>
                                    <td><RequestDriverButton
                                        onClick={() => handleConfirmRide(option)} 
                                        disabled={loading}
                                    >
                                        {loading ? "Confirmando..." : "Escolher"}
                                    </RequestDriverButton></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DriversList>
                <MapBox></MapBox>
            </OptionsBox>
        </OptionsContainer>
    )
}
