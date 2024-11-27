import { FormContainer, HomeContainer, RequestRideButton } from "./styles";
import { useForm } from'react-hook-form'
import { toast } from 'sonner'
import { requestRide } from "../../api/request-ride";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../contexts/CustomerContext";
import { AxiosError } from 'axios';

type RequestRideForm = {
    customer_id: string;
    origin: string;
    destination: string;
}

export function Home() {
    const { register, handleSubmit, formState: { isSubmitting} } = useForm<RequestRideForm>()
    const { setCustomerId, setOrigin, setDestination } = useCustomer();
    const navigate = useNavigate();

    async function handleForm(data: RequestRideForm) {
        try {
            const response = await requestRide(data)
            setCustomerId(data.customer_id)
            setOrigin(data.origin)
            setDestination(data.destination)
            navigate('/ride-options', { state: { ...response, origin: data.origin, destination: data.destination } })
        } catch (error) {
            if (error instanceof AxiosError && error?.response?.data?.error_description) {
                toast.error(error.response.data.error_description);
            } else {
                toast.error('Ocorreu um erro inesperado');
            }
        }
    }

    return (
        <HomeContainer>
            <h2> Insira os dados para solicitar uma viagem: </h2>
            <form action="" onSubmit={handleSubmit(handleForm)}>
                <FormContainer>
                    <label htmlFor="customer_id">Id do usuário</label>
                    <input id="customer_id" {...register('customer_id')}/>

                    <label htmlFor="origin">Endereço de partida</label>
                    <input id="origin" type="text" {...register('origin')}/>

                    <label htmlFor="destination">Endereço de destino</label>
                    <input id="destination" type="text" {...register('destination')}/>
                </FormContainer>
                <RequestRideButton disabled={isSubmitting} type="submit">Solicitar</RequestRideButton>
            </form>
        </HomeContainer>
    )
}
