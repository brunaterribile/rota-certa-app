import { HeaderContainer } from "./styles";
import logo from '../../assets/logo.png';
import { MapPin, ClockCounterClockwise } from 'phosphor-react';
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <img src={logo} alt=""/>
            <h1>Rota Certa</h1>
            <nav>
                <NavLink to="/" title="Solicitar viagem">
                    <MapPin size={32}/>
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <ClockCounterClockwise size={32}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}
