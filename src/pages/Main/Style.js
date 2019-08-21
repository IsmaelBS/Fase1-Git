import Styled from 'styled-components';

export const Title = Styled.h1`
  color:${props => (props.error !== true ? 'red' : 'blue')};
`;
