import { BrowserRouter } from "react-router-dom";
import { GloblaStyles } from "./styles/styles";
import { Router } from "./Router";

export function App() {
  return (
    <>
      <GloblaStyles/>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

