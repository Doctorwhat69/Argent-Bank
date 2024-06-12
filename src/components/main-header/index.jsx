import argentBankLogo from "../../assets/image/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const MainHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
    }
  }, [user]);

  if (loading) {
    return <div>loading... </div>;
  }
  if (error) {
    return <div>error {error} </div>;
  }
  const handleUserClick = (e) => {
    e.preventDefault();
    navigate("/user");
  };
  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const loggedOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
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
