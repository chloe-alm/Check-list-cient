import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
require("./_listCreate.scss");
export default function ListCreate() {
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [createList, setCreateList] = useState({
    listName:"",
    isSubmitting: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    setCreateList({ ...createList, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setCreateList({
        ...createList,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: "http://localhost:8001/api/lists",
        data: JSON.stringify(createList),
      });

      if (result.status === 201) {
        return history.push("./lists");
      }
    } catch (error) {
      setCreateList({
        ...createList,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <div className="container">
      <form
        className="container_postCreate"
        method="POST"
        action="/posts"
        onSubmit={handleSubmit}
      >
       
        <div className="container_postCreate_content">
          <p>Le nom de la liste : </p>
         
          <textarea
          type="text"
            name="content"
            id="content"
            rows="3"
            cols=""
            placeholder="nom"
            value={createList.firstName}
            onChange={handleChange}
          ></textarea>
        </div>

        

        <div className="container_postCreate_erreur">{createList.errorMessage}</div>

        <button
          type="submit"
          className="container_postCreate_button"
          onClick={handleSubmit}
        >
          Créer
        </button>
      </form>
    </div>
  );
}
