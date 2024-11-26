import { FormContainer, HistoryContainer, HistoryList, RequestHistoryButton } from "./styles";

export function History() {
    return (
        <HistoryContainer>
            <h2> Histórico de viagens </h2>
            <form action="">
                <FormContainer>
                    <label htmlFor="customer_id">Id do usuário</label>
                    <input id="customer_id"/>

                    <label htmlFor="driver">Motorista</label>
                    <input id="driver" type="text"/>
                    <RequestHistoryButton type="submit">Buscar viagens</RequestHistoryButton>
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
                        <tr>
                            <td>Avenida João Polidori, 171</td>
                            <td>Rua Mauro de Próspero, 750</td>
                            <td>30/11/2024</td>
                            <td>Dominic Toretto</td>
                            <td>16,2 km</td>
                            <td>40 min</td>
                            <td>R$ 70</td>
                        </tr>
                        <tr>
                            <td>Avenida João Polidori, 171</td>
                            <td>Rua Mauro de Próspero, 750</td>
                            <td>30/11/2024</td>
                            <td>Dominic Toretto</td>
                            <td>16,2 km</td>
                            <td>40 min</td>
                            <td>R$ 70</td>
                        </tr>
                        <tr>
                            <td>Avenida João Polidori, 171</td>
                            <td>Rua Mauro de Próspero, 750</td>
                            <td>30/11/2024</td>
                            <td>Dominic Toretto</td>
                            <td>16,2 km</td>
                            <td>40 min</td>
                            <td>R$ 70</td>
                        </tr>
                        <tr>
                            <td>Avenida João Polidori, 171</td>
                            <td>Rua Mauro de Próspero, 750</td>
                            <td>30/11/2024</td>
                            <td>Dominic Toretto</td>
                            <td>16,2 km</td>
                            <td>40 min</td>
                            <td>R$ 70</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}