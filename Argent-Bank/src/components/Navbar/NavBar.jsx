import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/argentBankLogo.webp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.userName);
  const firstName = useSelector((state) => state.auth.firstName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {token ? (
            <>
              <Link className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle icon-left"></i>
                {userName || firstName}
              </Link>
              <Link className="main-nav-item" to="/" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Sign out
              </Link>
            </>
          ) : (
            <Link className="main-nav-item" to="/login">
              <i className="fa fa-user-circle icon-left"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
