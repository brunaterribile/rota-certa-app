import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
    }

    body {
        background: ${props => props.theme['gray-900']};
        color: ${props => props.theme['gray-300']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    .custom-toast {
        font-size: 16px;
        padding: 16px;
        border-radius: 8px;
        min-width: 300px;
        background-color: ${props => props.theme['gray-800']};
        color: ${props => props.theme['gray-100']};
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
`;
