import { useSelector } from "react-redux";
import { Account } from "../components/account";
import { UserHeader } from "../components/user-header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();


  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    } else if (!loading && !user) {
      navigate("/sign-in");
    }
  }, [user, loading, navigate]);
  
  


  return (
    <div>
      <UserHeader />
      <h2 className="sr-only">Accounts</h2>
      <Account />
      <Account />
      <Account />
    </div>
  );
};
