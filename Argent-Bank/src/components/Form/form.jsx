import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../store/authSlice";
import { userLogin, fetchUser } from "../../services/userServices";

const Form = () => {
  const form = useRef(); // Permet de référencer le formulaire dans le DOM
  const navigate = useNavigate(); // Hook pour naviguer vers d'autres pages
  const dispatch = useDispatch(); // Initialisation de dispatch pour envoyer des actions Redux
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => { // Gère la soumission du formulaire
    e.preventDefault();
    const userInfos = {
      email: form.current[0].value, 
      password: form.current[1].value,
      rememberMe: form.current[2].checked,
    };
    const payload = JSON.stringify(userInfos);

    try {
      const data = await userLogin(payload); // Envoie les informations de connexion à l'API
      if (data.body.token) { 
        dispatch(login({ token: data.body.token })); // Envoi le token redux

        const userData = await fetchUser(data.body.token); // Récupère les données utilisateur avec le token
        dispatch( 
          setUser({ // Action pour stocker les informations utilisateur
            id: userData.id,
            email: userData.email,
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
          })
        );

        if (userInfos.rememberMe) { 
          localStorage.setItem("token", data.body.token);
          sessionStorage.removeItem("token");
        } else { 
          sessionStorage.setItem("token", data.body.token);
          localStorage.removeItem("token");
        }

        navigate("/profile"); // Redirige vers la page de profil après la connexion réussie
      } else {
        console.error("Token not found in response:", data);
      }
    } catch (error) { 
      setErrorMessage("Invalid username or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <span
          className="error-login-message"
          style={{ color: "red", fontWeight: "bold" }}
        >
          {errorMessage}
        </span>
        <button className="sign-in-button">Sign In</button>
      </form>
    </>
  );
};

export default Form;
