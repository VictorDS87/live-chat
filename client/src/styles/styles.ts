import { createGlobalStyle } from "styled-components";

export const GloblaStyles =  createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        
        font-family: 'Roboto', sans-serif;
        font-weight: 400;

        background-color: rgb(245 247 219);

        margin: auto;
        margin-top: 0.7rem;
        margin-left: 0.3rem;
    }

    li {
        list-style: none;
        margin-left: -2rem;
    }

    a {
        text-decoration: none;
    }

    button, textarea, input {
        font-family: 'Roboto', sans-serif;
    }
`