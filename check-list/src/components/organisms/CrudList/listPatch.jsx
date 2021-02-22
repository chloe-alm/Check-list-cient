import React, { useEffect, useState } from "react";
import Axios from "axios";
import ListDelete from "../../organisms/CrudList/listDelete";
import { useHistory } from "react-router-dom";
import NavBar from "../../molecules/NavBar";

import Footer from "../Footer/Footer";
import { useAlert } from 'react-alert';
require("./_listPatch.scss");

export default function ListPatch({ datalist }) {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const alert = useAlert();
  // const token = localStorage.getItem("id")
  //faire la focntion userid correspond au userid token
  let [list, setList] = useState({
    listName: datalist.listName,

    isSubmitting: false,
    errorMessage: null,
  });
  const handleChange = (event) => {
    setList({ ...list, [event.target.name]: event.target.value });
  };

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        setList({
          ...list,
          isSubmittting: true,
        });
        const result = await Axios({
          method: "patch",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: `http://localhost:8001/api/lists/${datalist.id}`,
          data: JSON.stringify(list),
        });
        if (result.status === 201) {
          setList(result.data.changedList)
          history.push("/lists")
          alert.show("Liste bien modifié")
        }
      } catch (error) {
        setList({
          ...list,
          isSubmitting: false,
          errorMessage: error.response.data.description,
        });
      }
    };
    
  return (
    <div className="container">
      <NavBar/>
      <h2 className="container_titre">Modification du post</h2>

      <form
        className="container_postPatch"
        method="PATCH"
        action="/posts"
        onSubmit={handleSubmit}
      >
       
        <div className="container_postPatch_content">
          <p><strong>Le nom de la liste :</strong> </p>
          <textarea
            type="text"
            name="content"
            id="content"
            rows="10"
            cols="20"
            value={list.listName}
            onChange={handleChange}
          ></textarea>
        </div>

      

       

        <div className="container_postPatch_erreur">{list.errorMessage}</div>
        <button
          type="submit"
          className="container_button"
          onClick={handleSubmit}
        >
          Modifier
        </button>
      </form>
      

     {/* <Footer/>  */}
    </div>
  );
}
