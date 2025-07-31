import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../store/authSlice";
import { changeUsername } from "../services/userServices";

const UserHeader = () => {
  const dispatch = useDispatch(); //Initialisation de dispatch pour envoyer des actions Redux
  const user = useSelector((state) => state.auth) || {}; // Récupération des données utilisateur dans le store Redux (authSlice)
  const [newUsername, setnewUsername] = useState(); // État local pour stocker la nouvelle valeur du nom d’utilisateur en cours d’édition
  const [isEditing, setIsEditing] = useState(false); // État local pour savoir si on est en mode édition (true) ou non (false)

  const handleEditing = () => { // Active le mode édition
    setnewUsername(user.userName);
    setIsEditing(true);
  };

  const handleInputChange = (e) => { // Met à jour l’état local avec la nouvelle valeur du nom d’utilisateur
    setnewUsername(e.target.value);
  };

  const handleSaveNewUsername = async () => { // Enregistre la nouvelle valeur du nom d’utilisateur
    if (newUsername.trim().length < 2) { 
      return;
    }
    try {
      dispatch(setUserName({ ...user, userName: newUsername })); // Met à jour le nom d’utilisateur dans le store Redux
      setIsEditing(false); 

      const payload = { // Mise à jour du nom
        userName: newUsername,
      };

      await changeUsername(payload, user.token); // Envoie la nouvelle valeur à l’API avec le token utilisateur
    } catch (error) {
      console.error("Failed to change username:", error);
    }
  };

  return (
    <div className="header">
      {isEditing ? (
        <div className="edit-user-info">
          <h2>Edit user info</h2>
          <div>
            <label htmlFor="username">User name:</label>
            <input
              id="username"
              className="edit-user edit-username-input"
              type="text"
              value={newUsername !== undefined ? newUsername : user.userName}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveNewUsername();
                }
                if (e.key === "Escape" || e.key === "ESC") {
                  setIsEditing(false);
                }
              }}
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              id="firstName"
              className="edit-user --not-editable"
              type="text"
              value={user.firstName || "[First Name]"}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              id="lastName"
              className="edit-user --not-editable"
              type="text"
              value={user.lastName || "[Last Name]"}
              readOnly
            />
          </div>
        </div>
      ) : (
        <h1>
          Welcome back <br />
          {`${user.userName || "[Username]"} `} !
        </h1>
      )}

      {isEditing ? (
        <div className="edit-buttons">
          <button className="edit-button-on" onClick={handleSaveNewUsername}>
            Save Name
          </button>
          <button
            className="edit-button-on"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button className="edit-button" onClick={handleEditing}>
          Edit Name
        </button>
      )}
    </div>
  );
};

export default UserHeader;
