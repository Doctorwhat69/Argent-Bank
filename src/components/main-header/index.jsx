import argentBankLogo from "../../assets/image/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const MainHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  // le state global redux
  const { user, loading } = useSelector((state) => state.user);

  // mon state local pour stocker la valeur de l'input
  const [firstName, setFirstName] = useState("");

  // ce use effect sert lors du rechargement de la page pour éviter que user = null
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
    }
  }, [user]);

  if (loading) {
    return <div>loading... </div>;
  }
  
  const handleUserClick = (e) => {
    e.preventDefault();
    navigate("/user");
  };

  const loggedOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token") || sessionStorage.getItem("token");
    setFirstName("");
    dispatch(Logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/" onClick={handleHomeClick}>
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {firstName && (
          <a className="main-nav-item" href="/user" onClick={handleUserClick}>
            <i className="fa fa-user-circle"></i>
            {firstName}
          </a>
        )}

        {user ? (
          <a className="main-nav-item" href="#here" onClick={loggedOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        ) : (
          <a className="main-nav-item" href="/sign-in">
            <i className="fa fa-sign-out"></i>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};
