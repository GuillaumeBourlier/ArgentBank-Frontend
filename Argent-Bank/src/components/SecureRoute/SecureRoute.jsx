import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";


const SecureRoute = ({ children }) => { 
    const navigate = useNavigate(); 
const token = useSelector((state) => state.auth.token); // Récupération du token depuis le store Redux
useEffect(() => {
    if (!token) { // Si le token n'est pas présent, redirige vers la page de connexion
        navigate("/login");
    }
}, [token, navigate]);  // Vérifie si le token est présent, sinon redirige vers la page de connexion
return token ? children : null;
}
SecureRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SecureRoute;