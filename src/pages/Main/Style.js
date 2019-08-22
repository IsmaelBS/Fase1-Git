import Styled, { css, keyframes } from 'styled-components';

export const Form = Styled.form`
  margin-top:30px;
  display:flex;

  input {
    flex:1;
    border: 1px solid #eee;
    padding: 10px 15px;
    font-size:16px;
    border-radius: 4px;
  }

`;

const rotate = keyframes`
  0%: {
    transform: rotate(0deg);
  }

  100%: {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = Styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display:flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = Styled.ul`
  list-style: none;
  margin-top: 30px;



  li {
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;

    & + li {
      border-top: 1px solid #eeee;
    }
  }

  a {
    color: #7159c1;
    text-decoration: none;
  }
`;
