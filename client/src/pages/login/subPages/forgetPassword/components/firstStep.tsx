import { Input, Return, VerifyUser } from "../styles";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

interface User {
  user: string
  securyQuestion: string
}

interface PurchaseProps {
  onNext: (info: User) => void;
}


export function FirstStep({ onNext }: PurchaseProps) {
    const notify = (e: string) => toast.error(e);
  
    function handleNext (e: React.FormEvent<HTMLFormElement>){
        // Validate and process the data from the first stage
        
        e.preventDefault();
        
        const form = e.target as HTMLFormElement;
        console.log(form.username.value)
        
        const username = {
          user: form.username.value,
        };
      
        axios.post('http://localhost:3000/users/login/forgetpassword', username)
          .then((response) => {
            onNext(response.data);
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
                        <ArrowLeft size={19}/>
                    </NavLink>
                </Return>
                
                <Input>
                    <p>User</p>
                    <div>     
                        <input name="username" type="text" placeholder="type your user"/>
                    </div>

                </Input>
                <button type="submit">Search</button>
            </VerifyUser>
      </div>
    );
  }