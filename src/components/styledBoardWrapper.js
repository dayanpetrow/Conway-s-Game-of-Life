import styled from "styled-components";

const AppWrapper = styled.div`
    display: ${props => props.boardSetupIsDone ? 'initial' : 'none'};
`;

export default AppWrapper;