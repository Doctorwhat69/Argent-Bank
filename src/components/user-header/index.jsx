import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../../redux/UserSlice";

export const UserHeader = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const [modif, setModif] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeName({ newUserName }));
    setModif(false);
  };

  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  // fonction pour modifier
  const handleEditClick = () => {
    setModif(!modif);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {modif ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newUserName}
              onChange={handleUserNameChange}
              placeholder="Enter new user name"
              className="header"
            />
            <button type="submit" className="header">
              ☑
            </button>
          </form>
        ) : (
          user.userName
        )}
      </h1>
      <button className="edit-button" onClick={handleEditClick}>
        Edit Name
      </button>
    </div>
  );
};
