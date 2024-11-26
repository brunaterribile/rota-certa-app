import styled from "styled-components";

export const HistoryContainer = styled.main`
    height: calc(100vh -10rem);
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h2 {
        margin-top: 2rem;
    }
`;

export const FormContainer = styled.main`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    color: ${props => props.theme['gray-100']};
    font-size: 1.3rem;
    font-weight: bold;

    input {
        flex: 1;
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

export const RequestHistoryButton = styled.button`
    flex-shrink: 0;
    padding: 0.7rem 1.6rem;
    border: none;
    border-radius: 8px;
    background: ${props => props.theme['green-500']};
    color: ${props => props.theme['gray-100']};
    font-weight: bold;
    font-size: 1.3rem;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme['green-700']};
    }
`;

export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th {
            background-color: ${(props) => props.theme['green-700']};
            padding: 1rem;
            text-align: left;
            color: ${(props) => props.theme['gray-100']};
            font-size: 1.2rem;
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
            background-color: ${(props) => props.theme['gray-700']};
            border-top: 4px solid ${(props) => props.theme['gray-800']};
            padding: 1rem;
            font-size: 1rem;
            line-height: 1.6;

            &:first-child {
                width: 30%;
                padding-left: 1.5rem;
            }

            &:nth-child(2) {
                width: 30%;
            }
        }
    }
`;
