import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";


const SecureRoute = ({ children }) => { 
    const navigate = useNavigate(); 
const token = useSelector((state) => state.auth.token); 
useEffect(() => {
    if (!token) { 
        navigate("/login");
    }
}, [token, navigate]);  
return token ? children : null;
}
SecureRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SecureRoute;