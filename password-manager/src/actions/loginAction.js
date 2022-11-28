import axios from "axios";

const rootUrl = "http://localhost:8080";

export const userLogin = (email, password) => {
    return (dispatch) => {
        axios.post(`${rootUrl}/api/users/login`, {email, password})
        .then((res) => {
            localStorage.setItem("access", res.headers.get('x-access-token'))
            localStorage.setItem("refresh", res.headers.get('x-refresh-token'))
            localStorage.setItem("_id", res.data.user._id)
            dispatch(loginSuccess(res.data.user))
        })
        .catch((err) => {
            console.log(err)
            dispatch(loginError(err.response.massage));
        })
    }
}

// export const userRegister = (email, name, password) => {
//     return (dispatch) => {
//      return api.users
//       .register(email, name, password)
//       .then((res) => {
//         console.log(res)
//         dispatch(registerSuccess(res.massage))
//       }).then(res => console.log(res))
//       .catch(err => {
//         dispatch(registerError(err.response.data.massage))
//       })
//     }
// }

export const userRegister = (email, name, password) => {
  return (dispatch) => {
    axios.post(`${rootUrl}/api/users/register`, {email, name, password})
    .then((res) => {
      console.log(res)
      dispatch(registerSuccess(res.data.user))
    }).then(res => console.log(res))
    .catch(err => {
      dispatch(registerError(err.response.data.massage))
    })
  }
}

export const logOutFunc = () => {
    return (dispatch) => {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      localStorage.removeItem("_id")
      dispatch(logOutAction())
    }
}


//----------------------------------------------------------------------------------

const loginSuccess = (user) => {
    return {
      type: "LOGIN-SUCCESS",
      payload: user,
    };
  };

  const loginError = (err) => {
    return {
      type: "LOGIN-ERROR",
      payload: err,
    };
  };
  
const registerSuccess = (success) => {
  return {
    type: "REGISTER-SUCCESS",
    payload: success
  }
}
const registerError = (err) => {
  return {
    type: "REGISTER-ERROR",
    payload: err
  }
}

const logOutAction = () => {
  return {
    type: "LOGOUT"
  }
}