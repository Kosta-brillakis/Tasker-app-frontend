import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { NavLink } from "react-router-dom";
import { removeFromLocalStorage } from "../../helpers/auth";

function Main() {
  //context
  const [auth, setAuth] = useContext(AuthContext);

  const logout = () => {
    setAuth(null);
    removeFromLocalStorage("auth");
  };

  return (
    <ul className="nav shadow mb-2 d-flex justify-content-center">
      <li className="nav-item">
        <NavLink end to="/" className="nav-link">
          Home
        </NavLink>
      </li>

      {auth !== null && auth !== undefined ? (
        <li>
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{auth?.user?.name}</a>

          <ul className="dropdown-menu">
            <li>
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="nav-link" onClick={logout}>
                Logout
              </NavLink>
            </li>
          </ul>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default Main;
