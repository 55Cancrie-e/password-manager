let initialState = {
    user: {},
    lists: [],
    newListSucc: false,
    deleteListReq: false,
    newListMassege: '',
    editListSucc: false,
    err: '',
    deleteList: '',
    massege: ''
  };

const list = (state = initialState, action) => {
    switch(action.type) {
        case "USER_INFO_SUCCESS":
            return {
                ...state,
                user: action.payload
            }
        case "USER_INFO_ERROR": 
            return {
                ...state,
                err: action.payload
            }
        case "GET_LISTS": 
            return {
                ...state,
                lists: action.payload
            }
        case "GET_LISTS_ERROR":
            return {
                ...state,
                err: action.payload
            }
        case "NEW_LIST_REQ":
            return {
                ...state,
                newListSucc: false
            }
        case "NEW_LIST_SUCC":
            return {
                ...state,
                newListSucc: true,
                newListMassege: action.payload
            }
        case "NEW_LIST_ERR": 
            return {
                ...state,
                newListMassege: action.payload
            }
        case "DELETE_REQ":
            return {
                ...state,
                deleteListReq: false
            }
        case "DELETE_LIST":
            return {
                ...state,
                deleteList: action.payload,
                deleteListReq: true
            }
        case "EDIT_LIST":
            return {
                ...state,
                editListSucc: true,
                massege: action.payload
            }
        default:
          return {
                 ...state
             };          
    }
}

export default list;
