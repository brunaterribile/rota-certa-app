import { FormContainer, HomeContainer, RequestRideButton } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <h2> Insira os dados para solicitar uma viagem: </h2>
            <form action="">
                <FormContainer>
                    <label htmlFor="customer_id">Id do usuário</label>
                    <input id="customer_id"/>

                    <label htmlFor="origin">Endereço de partida</label>
                    <input id="origin" type="text"/>

                    <label htmlFor="destination">Endereço de destino</label>
                    <input id="destination" type="text"/>
                </FormContainer>
                <RequestRideButton type="submit">Solicitar</RequestRideButton>
            </form>
        </HomeContainer>
    )
}
