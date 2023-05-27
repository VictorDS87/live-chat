import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { CreateNewAccount } from "./pages/login/subPages/createNewAccount";
import { ForgetPassword } from "./pages/login/subPages/forgetPassword";
import { Chat } from "./pages/chat";

import { useState } from "react";

export function Router() {
    const [ user, setUser ] = useState('')

    function getUser(e: string) {
        setUser(e)
    }
    return (
        <Routes>
            <Route path="/" element={<Login user={getUser}/>}/>
            <Route path="/newaccount" element={<CreateNewAccount />}/>
            <Route path="/forgetpassword" element={<ForgetPassword />}/>
            {user && <Route path="/chat" element={<Chat user={user} />} />}
        </Routes>
    )
} 