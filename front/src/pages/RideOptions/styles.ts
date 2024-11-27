import styled from "styled-components";

export const OptionsContainer = styled.main`
    height: calc(100vh -10rem);
    flex: 1;

    display: flex;
    flex-direction: column;

    h2 {
        margin: 2rem 0;
    }
`;

export const OptionsBox = styled.div`
    display: flex;
    gap: 3rem;
`;

export const DriversList = styled.div`
    //background-color: blue;
    flex: 1;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th {
            background-color: ${(props) => props.theme['green-700']};
            padding: 1rem;
            text-align: left;
            color: ${(props) => props.theme['gray-100']};
            font-size: 1rem;
            line-height: 1.6;

            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child {
                border-top-right-radius: 8px;
            }
        }

        td {
            min-width: 100px;
            background-color: ${(props) => props.theme['gray-700']};
            border-top: 4px solid ${(props) => props.theme['gray-800']};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                padding-left: 1.5rem;
            }
        }
    }
`;

export const MapBox = styled.div`
    height: 500px;
    width: 600px;
    background-color: pink;
`;

export const RequestDriverButton = styled.button`
    padding: 0.7rem 1.6rem;
    border: none;
    border-radius: 8px;
    background: ${props => props.theme['green-500']};
    color: ${props => props.theme['gray-100']};
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme['green-700']};
    }
`;
