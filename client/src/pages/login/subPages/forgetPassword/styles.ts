import styled, { keyframes } from "styled-components";

export const VerifyUser = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 17rem auto;

    width: 400px;
    padding: 3rem 0;

    border-radius: 10px;

    background: white;

    word-wrap: break-word;
    overflow-wrap: break-word;
    button {
      background: transparent;
      border: none;
      font-size: 16px;

      cursor: pointer;
      transition: .4s;
      &:hover {
        color: #F75A68;
      }
    }
`

const move = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
`;

export const Return = styled.div`
    width: 100%;

    margin-left: 1rem;

    cursor: pointer;
    &:hover {
        animation: ${move} 0.5s linear infinite;
        transition: .3s;
        color: #F75A68;
    }

`

export const Input = styled.div`
    margin-bottom: 2rem;

    p {
        margin-bottom: 0;
    }

    div {
        display: flex;
        align-items: center;
        border-bottom: 1px solid;

        svg {
            color: #808187;
        }

        input {
            border: none;
            outline: none;

            height: 30px;
            width: 250px;
            /* border-bottom: 1px solid; */
            background: transparent;

            margin-left: 10px;
        }
    }
`