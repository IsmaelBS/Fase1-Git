import Styled, { css, keyframes } from 'styled-components';

export const Container = Styled.div`
  background-color:#FFF;
  max-width: 700px;
  margin: 30px auto;
  padding:30px;
  border-radius: 4px;
  box-shadow: 0px 0px 30px rgba(0,0,0,0.1);

  h1 {
    display: flex;
    align-items: center;
    font-size:20px;

    svg {
      margin-right: 10px;
    }
  }
`;

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

const animate = keyframes`
  from: {
    transform: rotate(0deg);
  }

  to: {
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



   ${props => {
     props.loading &&
       css`
         svg {
           animation: ${animate} linear infinite 2s;
         }
       `;
   }}
`;
