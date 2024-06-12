import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./index.css";
import { MainHeader } from "./components/main-header";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/Sign-in";
import { User } from "./pages/User";
import { Footer } from "./components/footer";
import { Error } from "./pages/Error";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MainHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
