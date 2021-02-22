import React, { useState } from "react";
import Axios from "axios";
import { Link, link, useHistory } from "react-router-dom";

import { useAlert } from "react-alert";

require("./_register.scss");

export default function Register(props) {
  const history = useHistory();

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",

  });
  const [errorForm, setErrorForm] = useState(" ");
  const alert = useAlert();

  const handleChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8001/api/register", register)
      .then((res) => {
        setRegister({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        
        
        });
        
        history.push("./login");
        alert.show('Inscription validée!')
      })
      .catch((error) => {
        setErrorForm(error.response.data.description);
      });
  };

  return (
    <div className="formContainer">
    <h2 className="formContainer_titleForm">
        Inscription
    </h2>
    <form onSubmit={handleSubmit} className="formContainer_form">
        <label htmlFor="firstname" className="formContainer_form_labels">
            Prénom:
        </label>
        <input 
        type="text" 
        value={register.firstName}
        name="firstName" 
        id="firstname" className="formContainer_form_inputs" placeholder="prénom" 
        onChange={handleChange}
        required/> 

        <label htmlFor="lastname" className="formContainer_form_labels">
            Nom:
        </label>
        <input 
        type="text" 
        value={register.lastName}
        name="lastName" 
        id="lastname" className="formContainer_form_inputs" placeholder="Nom" 
        onChange={handleChange}
        required/> 

        <label htmlFor="email" className="formContainer_form_labels">
            Adresse email:
        </label>
        <input 
        type="email"
        value={register.email} 
        name="email" 
        id="email" className="formContainer_form_inputs" placeholder="exemple@mail.com"
        onChange={handleChange}
        required/> 

        <label htmlFor="password" className="formContainer_form_labels">
            Mot de passe:
        </label>
        <input 
        type="password" 
        value={register.password}
        name="password" 
        id="password" className="formContainer_form_inputs" 
        onChange={handleChange}
        required/> 

        {/* <label htmlFor="verifyPassword" className="formContainer_form_labels">
            Vérification du mot de passe:
        </label>
        <input 
        type="password" 
        value={signup.verifyPassword}
        name="verifyPassword" 
        id="verifyPassword" className="formContainer_form_inputs"
        onChange={handleChange}
        required/> 

<p>{signup.errorVerification}</p> */}

        <div className="formContainer_form_buttonContainer">
            <button
            type="submit"
            value="Envoyer"
            onClick={handleSubmit}>
                Envoyer
            </button>
            <p>Déjà inscript? <Link to="/login"><b>se connecter</b> </Link></p>
        </div>


        
    </form>
</div>
)
}
  
