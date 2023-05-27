import { User, Lock } from "phosphor-react";
import { Container, Input, LoginButton, LoginInfo, SignUp, ForgetPassword } from "./styles";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

interface User {
    user: (user: string) => void
}
export function Login({user}: User) {
    const Navigate = useNavigate()
    const notify = (e: string) => toast.error(e);

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const form = e.target as HTMLFormElement;
        
        const loginData = {
            user: form.username.value,
            password: form.password.value,
        };

        const username = loginData.user 
        user(username)
        
        
        axios.post('http://localhost:3000/users/login', loginData)
        .then(() => {
            socket.emit('login', { username });
            Navigate('chat');
          })
          .catch((error) => {
            notify(error.response.data.error)
          });
    }

    console.log('home')
    return (
        <Container>
            <ToastContainer />
            <LoginInfo onSubmit={handleLogin}>
                <h1>Login</h1>
                <Input>
                    <p>Username</p>
                    <div>
                        <User />
                        <input name="username" type="text" placeholder="type your username"/>
                    </div>
                
                </Input>
                <Input>
                    <p>Password</p>
                    <div>
                        <Lock size={18}/>
                        <input name="password" type="text" placeholder="type your password"/>
                    </div>
                <NavLink to="forgetpassword"><ForgetPassword>Forgot password?</ForgetPassword></NavLink>
                </Input>
                
  
                <LoginButton type="submit">
                    Login
                </LoginButton>
                <NavLink to="newaccount"><SignUp>Sign Up</SignUp></NavLink>
            </LoginInfo>
        </Container>
    )
}