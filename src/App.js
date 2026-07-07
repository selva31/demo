import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Forgotpassword from "./components/pswd";
import Chat from "./components/chatbot";
import Notifications from "./components/notification";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Signup />}></Route>
          <Route path="/forgot" element={<Forgotpassword />}></Route>
          <Route path="/chatbot" element={<Chat />}></Route>
          <Route path="/sse" element={<Notifications />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
