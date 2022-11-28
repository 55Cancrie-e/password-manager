import axios from "axios";
import instance from "../api/instanseApi";
const rootUrl = "http://localhost:8080";


export const getUserInfo = () => {
    return (dispatch) => {
        instance.get(`${rootUrl}/api/userInfo/me`)
        .then(res => {
            dispatch(userInfoSuccess(res.data))
        })
        .catch(err => {
            dispatch(userInfoError(err.response.data.massege))
        })
    }
}


export const getLists = () => {
    return (dispatch) => {
        instance.get(`${rootUrl}/api/lists`)
        .then(res => {
            dispatch(getListsAction(res.data))
        })
        .catch(err => {
            dispatch(getListsError(err.response.data.massege))
        })
    }
}

export const newList = (name, password) => {
    return (dispatch) => {
        dispatch(newListRequest())
        instance.post(`${rootUrl}/api/lists`, {name, password})
        .then(res => {
            dispatch(newListSucc(res.data.massege))
        })
        .catch((err) => {
            console.dir(err)
            dispatch(newListErr(err.response.data.massege))
        })
    }
}

export const deleteListById = (id) => {
    return (dispatch) => {
        instance.delete(`${rootUrl}/api/lists/${id}`)
        .then(res => {
            dispatch(deleteListAction(res.data.massege))
        })
        .catch(err => {
            console.dir(err)
        })
    }
}

export const editList = (id, name, password) => {
    return (dispatch) => {
        instance.patch(`${rootUrl}/api/lists/${id}`, { name, password })
        .then(res => {
            dispatch(editListAction(res.data.massege))
        })
        .catch(err => {
            console.dir(err)
        })
    }
}


//----------------------------------------------------------------------------------------------------



const userInfoSuccess = (user) => {
    return {
        type: "USER_INFO_SUCCESS",
        payload: user,
      };
}

const userInfoError = (err) => {
    return {
        type: "USER_INFO_ERROR",
        payload: err
    }
}

const getListsAction = (data) => {
    return {
        type: "GET_LISTS",
        payload: data
    }
}

const getListsError = (err) => {
    return {
        type: "GET_LISTS_ERROR",
        payload: err
    }
}

const newListRequest = () => {
    return {
        type: "NEW_LIST_REQ"
    }
}

const newListSucc = (succ) => {
    return {
        type: "NEW_LIST_SUCC",
        payload: succ
    }
}

const newListErr = (err) => {
    return {
        type: "NEW_LIST_ERR",
        payload: err
    }
}

const deleteListAction = (succ) => {
    return {
        type: "DELETE_LIST",
        payload: succ
    }
}

const editListAction = (succ) => {
    return {
        type: "EDIT_LIST",
        payload: succ
    }
}