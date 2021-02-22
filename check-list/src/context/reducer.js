const reducer = (state, action) => {
    console.log("reducer check =>>", action);
    console.log("STATEE reducer",state)
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", action.payload.data.user.id);
        
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.data.token,
          user: action.payload.data.user,
       
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      case "LOAD_USER":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          token: action.payload.token,
   
         
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  