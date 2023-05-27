import axios from "axios";
import { Input, VerifyUser } from "../styles";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PurchaseProps {
  userName: string
  onReset: () => void;
}

export function ThirdStep({ onReset, userName }: PurchaseProps) {    
    const notify = (e: string) => toast.error(e);

    async function handleReset(e: React.FormEvent<HTMLFormElement>) {
        // change account password
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        
        const ChargePassword = {
            user: userName,
            password: form.password.value,
            passwordRepeat: form.passwordRepeat.value
        };

        await axios.post('http://localhost:3000/users/login/forgetpassword/securyquestion/changepassword', ChargePassword)
            .then(() => {
                onReset();
            })
            .catch((error) => {
                notify(error.response.data.error)
            });
    }
  
    return (
        <div>
            <ToastContainer />
            <VerifyUser onSubmit={handleReset}>
                <Input>
                    <p>password</p>
                    <div>
                    
                        <input name="password" type="text" placeholder="type your user"/>
                    </div>

                </Input>
                <Input>
                    <p>repeat password</p>
                    <div>

                        <input name="passwordRepeat" type="text" placeholder="type your user"/>
                    </div>

                </Input>
                <button>Change Password</button>
            </VerifyUser> 
      </div>
    );
  }