import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import Axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
// import NavBar from "../../molecules/NavBar";

import { useAlert } from "react-alert";
import Footer from "../../organisms/Footer/Footer";
import iconuser from"../../../assets/images/user.png"
require("./_login.scss");

export default function Login(props) {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  });
  const alert = useAlert();
  const [errorForm, setErrorForm] = useState(" ");
  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLogin({
        ...login,
        email: "",
        password: "",
        isSubmitting: true,
      });
      const result = await Axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8001/api/login",
        data: JSON.stringify(login),
      });
      if (result.status === 200) {
        return (
          dispatch({ type: "LOGIN", payload: result }),
          history.push("./"),
          alert.show("Vous êtes connecté")
        );
      }
    } catch (error) {
      setErrorForm(error.response.data.description);
      setLogin({
        ...login,
        isSubmitting: false,
        errorMessage: error.response,
      });
    }
  };

return (

  <div className="formContainer">
         
    <h2 className="formContainer_titleForm">Connexion</h2>
    <div className="formContainer_cercle">
      <img src={iconuser} alt="image user"/>
    </div>
    <form onSubmit={handleSubmit} className="formContainer_form">
      <label htmlFor="email" className="formContainer_form_labels">
        Adresse email:
      </label>
      <input
        type="email"
        value={login.email}
        name="email"
        id="emaillogin"
        className="formContainer_form_inputs"
        placeholder="exemple@mail.com"
        onChange={handleChange}
       
      />

      <label htmlFor="password" className="formContainer_form_labels">
        Mot de passe:
      </label>
      <input
        type="password"
        value={login.password}
        name="password"
        id="passlogin"
        className="formContainer_form_inputs"
        onChange={handleChange}
        required
      />
 <div className="fromContainer_from_erreur">{errorForm}</div>
      <div className="formContainer_form_buttonContainer">
        <button type="submit" value="Envoyer" onClick={handleSubmit}>
          Se connecter
        </button>
      </div>
    </form>

  </div>
);
}
