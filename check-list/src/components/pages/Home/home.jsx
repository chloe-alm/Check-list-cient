import React, { useContext } from "react";
import NavBar from "../../molecules/NavBar";
import { AuthContext } from "../../../context/auth";
import checklist from "../../../assets/images/checklist.png";
import Footer from "../../organisms/Footer/Footer";
import "./_home.scss";
import Horloge from "../../atoms/Horloge";

export default function Home(props) {
  const { state } = useContext(AuthContext);
  return (
    <div className="home">
      <NavBar />
      <Horloge/>
      <h2 className="home_titre">
          Bienvenue 
          <span> {state.user&& state.user.firstName.toUpperCase()}</span>
      </h2>
          <img
          className="home_image"
          src={checklist}
          alt="image de l accueil"
          />
          <p className="home_paragraphe">
          Cet outil <strong>Just Do It</strong> permet d’organiser des tâches et des listes de façon très intuitive. A découvrir d’urgence si vous ne le connaissez pas encore : nous vous le recommandons !
           </p>
    

    
          <Footer/>
    </div>
  );
}
