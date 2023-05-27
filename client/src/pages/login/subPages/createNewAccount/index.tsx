import { User, Lock, ArrowLeft } from "phosphor-react";
import { Container, CreateNewAccountButton, Input, NewAccountInfo, Return } from "./styles";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

interface NewUser {
    user: string,
    nickname: string,
    password: string,
    passwordRepeat: string,
    securyQuestion: string,
    securyQuestionPassword: string
}

export function CreateNewAccount() {
    const Navigate = useNavigate()
    const notify = (e: string) => toast.error(e);
    
    function handleSubmitNewUser(e: React.FormEvent<HTMLFormElement>) {
        //Create new user in db
        e.preventDefault()
        
        const form = e.target as HTMLFormElement;

        const newUser: NewUser = { 
            user: form.user.value, 
            nickname: form.nickname.value,
            password: form.password.value,
            passwordRepeat: form.passwordRepeat.value,
            securyQuestion: form.securityQuestion.value,
            securyQuestionPassword: form.securityQuestionPassword.value
         };
      
        axios.post('http://localhost:3000/users', newUser)
          .then(() => {
            socket.emit('newAccount', newUser.user );
            Navigate("/");
          })
          .catch((error) => {
            notify(error.response.data.error)
          });
    }

 
    return (
        <Container>
            <ToastContainer />
            <NewAccountInfo onSubmit={handleSubmitNewUser}>
                <Return>
                    <NavLink to="/">
                        <ArrowLeft size={19}/>
                    </NavLink>
                </Return>
                <h1>Create</h1>
                <Input>
                    <p>user(private)</p>
                    <div>
                        <User />
                        <input name="user" type="text" placeholder="type your user"/>
                    </div>
                
                </Input>
                <Input>
                    <p>nickname(public)</p>
                    <div>
                        <User />
                        <input name="nickname" type="text" placeholder="type your nickname"/>
                    </div>
                
                </Input>
                <Input>
                    <p>password</p>
                    <div>
                        <User />
                        <input name="password" type="text" placeholder="type your password"/>
                    </div>
                
                </Input>
                <Input>
                    <p>repeat the password</p>
                    <div>
                        <Lock size={18}/>
                        <input name="passwordRepeat" type="text" placeholder="type your passord"/>
                    </div>
                
                </Input>
                <Input>
                    <p>security question</p>
                    <div>
                        <Lock size={18}/>
                        <input name="securityQuestion" type="text" placeholder="type your secury question"/>
                    </div>
                </Input>
                <Input>
                    <p>secury question password</p>
                    <div>
                        <Lock size={18}/>
                        <input name="securityQuestionPassword" type="text" placeholder="type your secury password"/>
                    </div>
                </Input>
                <CreateNewAccountButton>Create Account</CreateNewAccountButton>

            </NewAccountInfo>
        </Container>

    )
}