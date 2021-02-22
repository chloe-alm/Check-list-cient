import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import reducer from "./context/reducer";
import './App.css';
// import Notfound from "../pages/NotFound/notFound";
import Register from "../src/components/pages/Register/register";
import Login from "../src/components/pages/Login/login";
import Home from "../src/components/pages/Home/home";
import Lists from "./components/pages/Lists/lists";

function App() {
  const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    isAdmin:null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await axios.get("http://localhost:8001/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.status === 200) {
          dispatch({
            type: "LOAD_USER",
            payload: result.data,
          });
        }
      }
    };
    fetchUser();
  }, []);
  const option = {
    position: positions.TOP_CENTER,
    timeout: 3000,
    transition: transitions.SCALE,
  };


  return (
    <AlertProvider template={AlertTemplate} {...option}>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {/* <h1>Just Do It</h1> */}
        <Router>
        
          <Switch>
          
          <Route exact path="/lists">
              <Lists />
            </Route>
          <Route exact path="/login">
              <Login />
            </Route>
          <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Home />
              </Route>
             
            {/* <Route path="*">
              <Notfound />
            </Route>  */}
          </Switch>
        </Router>
       
     </AuthContext.Provider>
    </AlertProvider>
  );
}

export default App;
