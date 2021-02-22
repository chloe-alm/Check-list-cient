import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/auth";

import { useEffect } from "react";
import logout from "../../assets/images/logoutviolet.png";
import addList from "../../assets/images/addList.png";
// import Horloge from "../atoms/Horloge"
require("./_navBar.scss");

export default function NavBar() {
  const { state } = useContext(AuthContext);
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    state.user && console.log(state.user.firstName);
    return () => {};
  }, [state]);
  if (state.isAuthenticated === true) {
    return (
      <>
        <section className="navBar_connecter">
          <Link className="navBar_connecter_logo" to="/">
            <img src={logo} alt="logo" />
            <h1 className="navBar_connecter_titre">Just Do It</h1>
          </Link>

          <button className="navBar_connecter_button">
          <Link className="navBar_connecter_button_link" to="/lists">
            <img
              className="navBar_connecter_button_addList"
              src={addList}
              alt="logo addList"
            />
            
              <p>Ajouter une liste</p>
            </Link>
          </button>

          <button
            className="navBar_connecter_button"
            onClick={() => {
              Logout();
            }}
          >
            <Link className="navBar_connecter_button_link" to="/logout">
            <img
              className="navBar_connecter_button_addList"
              src={logout}
              alt="logo deconnexion"
            />
            
              <p>Se déconnecter</p>
            </Link>
          </button>
         
        </section>
      </>
    );
  }
  return (
    <div className="navBar">
      <Link className="navBar_logo" to="/">
        <img src={logo} alt="logo" />
        <h1 className="navBar_titre">Just Do It</h1>
      </Link>
      {/* <img className="navBar_logo" src={logo} alt="logo" /> */}

      <div className="navBar_boutons">
        <button className="navBar_boutons_register ">
          <Link className="navBar_link" to="/register">
            S'inscrire
          </Link>
        </button>
        <button className="navBar_boutons_login media_phone">
          <Link className="navBar_link" to="/login">
            Se connecter
          </Link>
        </button>
      </div>
    </div>
  );
}
