import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ListPatch from "./listPatch";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import Footer from "../../organisms/Footer/Footer";
import NavBar from "../../molecules/NavBar";
import { useAlert } from 'react-alert';
require("./_listDelete.scss");

export function ListDelete({ list }) {
  const token = localStorage.getItem("token");
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const alert = useAlert();
  const [deleteList, setDeleteList] = useState({
    listName: list.listName,
   
    isSubmitting: false,
    errorMessage: null,
  });
 
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setDeleteList({
        ...deleteList,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8001/api/lists/${list.id}`,
        data: JSON.stringify(deleteList),
      });
      console.log(result);
      if (result.status === 201) {
        return alert.show("Liste bien supprimée"),history.push("/lists");
      }
    } catch (error) {
      setDeleteList({
        ...deleteList,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };
  let [testModifie, setTestModifie] = useState(false);
  const redirectModif = () => {
    setTestModifie(true);
  };
  if (testModifie === true) {
    console.log(testModifie);
    return (
      <div>
        <ListPatch datapost={list} />
      </div>
    );
  } else {
    return (
      <div className="deleteContainer">
        <NavBar/>
        {
          state.user.id === list.userId ? (
        <h2 className="deleteContainer_titre">
          Voulez vous modifier/supprimer votre liste?{" "}
        </h2>
        ): (
        <div></div>)
        }

        
        <form
          method="DELETE"
          action="/posts"
          className="deleteContainer_OnePost"
          onSubmit={handleSubmit}
        >
          

          <div className="deleteContainer_OnePost_details">
            <div className="deleteContainer_OnePost_details_content">
            {list.listName} 
            </div>
            
          </div>

          {
            state.user.id === list.userId ? (
              <div>
                <div className="deleteContainer_OnePost_erreur">
                  {deleteList.errorMessage}
                </div>

                <button
                type="submit"
                className="deleteContainer_OnePost_boutonSupprimer"
                onClick={handleSubmit}
                >
                  Supprimer
                </button>
    
                <button
                  type="button"
                  className="deleteContainer_OnePost_boutonModifier"
                  onClick={redirectModif}
                >
                  Modifier
                </button>
              </div>
            ):(<div></div>)
            }
          
        </form>
      </div>
        
    );
  }
}
