import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserInformations, changeName } from "../../redux/UserSlice";

export const UserHeader = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const [modif, setModif] = useState(false);
  const [newUserName, setNewUserName] = useState(user?.userName || "");
  const dispatch = useDispatch();

  //les dependencies ?
  useEffect(() => {
    if (!user) {
      dispatch(UserInformations());
    }
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeName(newUserName));
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
    return <div>Error</div>;
  }

  if (!user) {
    return <div></div>;
  }

  return (
    <div className="header">
      {modif ? (
        <>
          <h1>Edit User Info</h1>

          <form onSubmit={handleSubmit} className="form-user">
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              autoComplete="username"
              type="text"
              name="username"
              value={newUserName}
              onChange={handleUserNameChange}
              placeholder="New user name"
              className="input-user"
            />
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={user?.firstName}
              readOnly
              disabled
              className="input-user"
            />
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={user?.lastName}
              readOnly
              disabled
              className="input-user"
            />
            <br />
            <div className="btn-form">
              <button type="submit" className="edit-button">
                Save
              </button>
              <button className="edit-button" onClick={handleEditClick}>
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1>
            Welcome Back
            <br />
            {user.userName}
          </h1>
        </>
      )}
      {!modif && (
        <button className="edit-button" onClick={handleEditClick}>
          Edit Name
        </button>
      )}
    </div>
  );
};
