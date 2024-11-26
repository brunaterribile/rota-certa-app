import { DriversList, MapBox, OptionsBox, OptionsContainer, RequestDriverButton } from "./styles";

export function RideOptions() {
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
                            <tr>
                                <td>Dominic Toretto</td>
                                <td>Ei, aqui é o Dom.</td>
                                <td>Dodge Charger R/T 1970 modificado</td>
                                <td>4/5 Que viagem incrível! </td>
                                <td>R$50</td>
                                <td><RequestDriverButton > Escolher </RequestDriverButton ></td>
                            </tr>
                            <tr>
                                <td>Dominic Toretto</td>
                                <td>Ei, aqui é o Dom.</td>
                                <td>Dodge Charger R/T 1970 modificado</td>
                                <td>4/5 Que viagem incrível! </td>
                                <td>R$50</td>
                                <td><RequestDriverButton > Escolher </RequestDriverButton ></td>
                            </tr>
                            <tr>
                                <td>Dominic Toretto</td>
                                <td>Ei, aqui é o Dom.</td>
                                <td>Dodge Charger R/T 1970 modificado</td>
                                <td>4/5 Que viagem incrível! </td>
                                <td>R$50</td>
                                <td><RequestDriverButton > Escolher </RequestDriverButton ></td>
                            </tr>
                        </tbody>
                    </table>
                </DriversList>
                <MapBox></MapBox>
            </OptionsBox>
        </OptionsContainer>
    )
}