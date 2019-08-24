import styled from 'styled-components';

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-size: 30px;
  color: #fff;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  a {
    text-decoration: none;
    margin-bottom: 20px;
    color: #7159c1;
  }

  img {
    border-radius: 50%;
    width: 120px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }
`;

export const IssuesList = styled.ul`
  list-style: none;
  padding-top: 30px;
  border-top: 1px solid #eee;
  margin-top: 30px;

  select {
    width: 100%;
    border: 1px solid #eee;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  li {
    display: flex;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50px;
      border: 1px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  button {
    border-radius: 4px;
    width: 80px;
    color: #fff;
    height: 40px;
    border: 0px;
    outline: none;
    background-color: #7159c1;
    font-weight: 700;
  }

  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
