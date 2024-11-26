import styled from "styled-components";

export const HomeContainer = styled.main`
    max-width: 74rem;
    height: calc(100vh -10rem);
    flex: 1;

    display: flex;
    flex-direction: column;

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3.5rem;
    }

    h2 {
        margin: 2rem 0;
    }
`;

export const FormContainer = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme['gray-100']};
    font-size: 1.3rem;
    font-weight: bold;
    flex-wrap: wrap;

    input {
        width: 100%;
        height: 2.5rem;
        padding: 0.8rem;
        border: 2px solid transparent;
        border-radius: 8px;
        outline: none;
        background: ${props => props.theme['gray-100']};
        color: ${props => props.theme['gray-800']};
        font-weight: bold;
        font-size: 1.125rem;
        box-shadow: none;
        box-sizing: border-box;
        
        &:focus {
            border: 2px solid ${props => props.theme['green-500']};
        }
    }
`;

export const RequestRideButton = styled.button`
    width: 40%;
    padding: 0.7rem 1.6rem;
    border: none;
    border-radius: 8px;
    background: ${props => props.theme['green-500']};
    color: ${props => props.theme['gray-100']};
    font-weight: bold;
    font-size: 1.3rem;
    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background: ${props => props.theme['green-700']};
    }
`;
