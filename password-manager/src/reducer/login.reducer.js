let initialState = {
    loginSuccess: false,
    registerSuccess: false,
    error: "",
    currentUser: {},
    currentUserName: '',
    registerError: '',
    register: {}
  };

const login = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN-SUCCESS":
            return {
              ...state,
              loginSuccess: true,
              currentUserId: action.payload,
              error: "",
            };
        case "LOGIN-ERROR":
            return {
                  ...state,
                  error: action.payload,
                  loginSuccess: false
                };
        case "REGISTER-SUCCESS":
              return {
                ...state,
                register: action.payload,
                registerSuccess: true
              }
        case "REGISTER-ERROR":
              return {
                ...state,
                registerSuccess: false,
                registerError: action.payload
              }
        case "LOGOUT":
              return {
                ...state,
                currentUser: {},
                loginSuccess: false
              }
        default:
          return {
                 ...state,
             };          
    }
}

export default login;
