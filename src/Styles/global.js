import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding:0;
    margin:0;
    box-sizing:border-box;
    outline:0;
  }

  body,html,#root {
    min-height:100%;
  }

  body {
    background-color:#7159c1;
    -webkit-font-smoothing: antialiased!important
  }

  body,input,button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    color:#222;
  }

  button {
    cursor: pointer;
  }

`;
