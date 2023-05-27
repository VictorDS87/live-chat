import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
        transform: rotate(0deg)   
  }
  25% {
        transform: rotate(60deg)   
  }
  50% {
        transform: rotate(160deg)   
  }
  75% {
        transform: rotate(260deg)   
  }
  100% {
        transform: rotate(360deg) 
  }
`;  

const horizontalMovement = keyframes`
  0% {
    transform: translateX(0)   
  }
  25% {
    transform: translateX(3px)    
  }
  50% {
    transform: translateX(2px)    
  }
  75% {
    transform: translateX(1px)      
  }
  100% {
    transform: translateX(0)   
  }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ChatContainer = styled.div`
    display: flex;
    
    max-width: 600px;
    max-height: 800px;

    margin: 3.5rem 20rem;

    background-color: white;

    border-radius: 10px;

`

export const Chats = styled.div`
    display: flex;
    flex-direction: column;
    
    overflow: auto;

    border-right: 1px solid rgb(221 221 221);

    width: 195px;
    height: 800px;

    &::-webkit-scrollbar {
        width: 8px; /* Largura da barra de rolagem */
    }

    &::-webkit-scrollbar-track {
        background-color: transparent; /* Cor do fundo da barra de rolagem */
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1); /* Cor da thumb (alça) da barra de rolagem */
        border-radius: 20px;
    }
`

export const Disconnect = styled.a`
    position: absolute;
    
    margin-left: 5rem;
    color: black;

    cursor: pointer;
    &:hover {
        svg {
            color: #F75A68;
        }
    }
`

export const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.3rem;
`

export const User = styled.button`
    box-shadow: 1px 1px 1px rgb(0 0 0 / 0.2);
    
    background-color: transparent;
    border: none;

    &:disabled {
        cursor: not-allowed;
    }

    h3 {
        display: flex;
        justify-content: flex-start;

        margin-bottom: 0;
        font-size: 15px;

        overflow: hidden;
    }

    div {
        p, span {
            margin-top: 0;
        }
        p {
            font-size: 14px;
            overflow: hidden;
            max-height: 17px;
            word-break: break-all;
            color: #424242f0;
        }
        span {
            font-size: 10px;
            color: #b7b7bb;
        }
        display: flex;
        justify-content: space-between;
    }

    transition: .4s;
    cursor: pointer;
    &:hover {
        box-shadow: 3px 3px 4px rgb(0 0 0 / 0.2);
        border-radius: 4px;
    }
    
    &:disabled {
        box-shadow: 3px 3px 4px rgb(0 0 0 / 0.2);
        border-radius: 4px;
    }
`

export const ChatText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    width: 413px;

`

export const Text = styled.div`
    overflow: auto;

    &::-webkit-scrollbar {
        width: 8px; 
    }
    
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1); 
        border-radius: 20px;    
    }

    ul {
        width: 200px;
        word-break: break-all;

        li {
            padding: 0.3rem;
            margin-top: 0.2rem;
            width: fit-content;
            background: yellow;
            border-radius: 15px;

            font-size: 0.8rem;

            width: 200px
        }
    }
`

export const Message = styled.div`
    max-width: 900px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    overflow-wrap: break-word;
    
`

export const MessageReceived = styled.div`
    width: 100%;
    margin-top: 1rem;
    margin-left: 2rem;

    background: #0584FE;
    border-radius: 18px 18px 18px 4px;
    color: white;

    p {
        max-width: 780px;
    }
`

export const MessageSent = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    p {
        word-break: break-all;
        width: 100px;
    }

    margin-right: 2rem;
    margin-left: 1rem;
    

    background: rgba(0, 0, 0, 0.06);
    border-radius: 18px 18px 6px 18px;

`

export const InputText = styled.form`
    display: flex;
    align-items: flex-end;
    
    align-items:center;
    
    background: rgb(175 179 185 / 42%);
    
    border-top: 1px solid rgb(221 221 221);
    border-radius: 0 0 10px 0;

    textarea {
        padding: 0;
        height: 50px;
        width: 100%;
        border: none;
        background-color: transparent;
        outline: none;
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
`

export const TextArea = styled.textarea`
    height: auto;
    width: 100%;
    border: none;

    resize: none;
    outline: none;  
`

export const SendMessage = styled.button`
    background: transparent;
    border: none;

    cursor: pointer;

    svg {
        border-radius: 20px;
        font-size: 1.4rem;
    }
    &:hover {
        svg {
            animation: ${horizontalMovement} 3.5s linear infinite;
            color: #F75A68;
        }
    }

    &:disabled {
        cursor: not-allowed;
        svg {
            animation: none;
            color: rgba(16, 16, 16, 0.3);
        }
    }
`