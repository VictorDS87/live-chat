import { Input, Return, VerifyUser } from "../styles";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import { X } from "phosphor-react";

interface User {
    user: string
    securyQuestion: string
}

interface PurchaseProps {
  userInfo: User
  onNext: (info: User) => void;
}

export function SecondStep({ onNext, userInfo }: PurchaseProps) {
    const notify = (e: string) => toast.error(e);
    
    async function handleNext(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const userInfoSecury = {
            passwordSecuryQuestion: form.securyQuestion.value,
            user: userInfo.user
        };

        await axios.post('http://localhost:3000/users/login/forgetpassword/securyquestion', userInfoSecury)
            .then(() => {
                onNext(userInfo);
            })
            .catch((error) => {
                notify(error.response.data.error)
        });

    }
    
    return (
        <div>
            <ToastContainer />
            <VerifyUser onSubmit={handleNext}>
                <Return>
                    <NavLink to="/">
                        <X size={19}/>
                    </NavLink>
                </Return>


                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                }}>
                    <h3>Security Question</h3>
                    <p>{userInfo.securyQuestion}</p>
                </div>

                <Input>

                    <div> 
                        <input name="securyQuestion" type="text" placeholder="type your password for secury question"/>
                    </div>

                </Input>
                <button>To check</button>
            </VerifyUser>
        </div>
    );
  }