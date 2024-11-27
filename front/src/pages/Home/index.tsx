import { FormContainer, HomeContainer, RequestRideButton } from "./styles";
import { useForm } from'react-hook-form'
import { toast } from 'sonner'
import { requestRide } from "../../api/request-ride";

type RequestRideForm = {
    customer_id: string;
    origin: string;
    destination: string;
}

export function Home() {
    const { register, handleSubmit, formState: { isSubmitting} } = useForm<RequestRideForm>()

    async function handleForm(data: RequestRideForm) {
        console.log(data)
        try {
            await requestRide(data)
        } catch (error) {
            toast.error('error')
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
