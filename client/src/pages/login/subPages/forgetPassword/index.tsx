
import { useState } from "react";
import { FirstStep } from "./components/firstStep";
import { SecondStep } from "./components/secondStep";
import { ThirdStep } from "./components/thirdStep";
import { useNavigate } from "react-router-dom";

interface User {
  user: string
  securyQuestion: string
}

export function ForgetPassword() {
    const [step, setStep] = useState('firstStep');
    const [userAndSecuryQuestion, setUserAndSecuryQuestion] = useState<User>({securyQuestion: '', user: ''});
    const [newPassword, setNewPassword] = useState('');
    
    const Navigate = useNavigate()

    function handleNextStep(value: User) {
      // advance to the next area

      if (step === 'firstStep') {
        setStep('secondStep');
        setUserAndSecuryQuestion(value)
      } else if (step === 'secondStep') {
        setStep('thirdStep');
        setNewPassword(value.user)
      }
    }
    
    function handleReset() {
      // finish updating the password and return to the main page
      Navigate('/')
    }

    return (
      <div>
        {step === 'firstStep' && <FirstStep onNext={handleNextStep} />}
        {step === 'secondStep' && <SecondStep onNext={handleNextStep} userInfo={userAndSecuryQuestion}/>}
        {step === 'thirdStep' && <ThirdStep onReset={handleReset} userName={newPassword}/>}
      </div>
    );
  }