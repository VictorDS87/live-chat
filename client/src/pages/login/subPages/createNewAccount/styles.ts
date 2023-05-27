import styled, { keyframes } from "styled-components";

export const Container = styled.div`

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
    position: relative;
    top: 10px;
    width: 100%;
    display: flex;

    margin-left: 1rem;

    cursor: pointer;
    &:hover {
        animation: ${move} 0.5s linear infinite;
        transition: .3s;

        svg {
            color: #F75A68;
        }
    }

`

export const NewAccountInfo = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5rem auto;

    width: 400px;
    height: 770px;

    border-radius: 10px;

    background: white;
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

export const ForgetPassword = styled.a`
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #808187;

    cursor: pointer;
    &:hover {
        transition: .4s;
        color: #e33d63;
    }
`

export const CreateNewAccountButton = styled.button`
    width: 72%;
    height: 40px;
    margin-bottom: 2rem;

    border-radius: 30px;
    border: none;

    background: linear-gradient(to right, #673c9bde, #8000805e), linear-gradient(to right, #ff000047, #ff0000a6); 
    color: white;
    font-size: 16px;

    cursor: pointer;

    &:hover {
        transition: .4s;
        filter: brightness(0.8);
    }
`

export const SignUp = styled.a`
    cursor: pointer;
    &:hover {
        transition: .4s;
        color: #e33d63;
    }
`
