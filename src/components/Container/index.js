import Styled from 'styled-components';

const Container = Styled.div`
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

export default Container;
