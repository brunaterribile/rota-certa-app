import styled from "styled-components";

export const LayoutContainer = styled.div`
    height: 100vh;
    padding: 2.5rem 5rem;
    background-color: ${props => props.theme['gray-800'] };
    border-radius: 8px;

    display: flex;
    flex-direction: column;
`;
