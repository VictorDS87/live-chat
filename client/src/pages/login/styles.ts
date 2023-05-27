import styled from "styled-components";

export const Container = styled.div`

`

export const LoginInfo = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 11rem auto;

    width: 400px;
    height: 600px;

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

export const ForgetPassword = styled.p`
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #808187;

    text-decoration: underline;

    cursor: pointer;
    &:hover {
        transition: .4s;
        color: #e33d63;
    }
`

export const LoginButton = styled.button`
    padding: 1rem 8rem;

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

export const SignUp = styled.p`
    cursor: pointer;
    &:hover {
        transition: .4s;
        color: #e33d63;
    }
`
