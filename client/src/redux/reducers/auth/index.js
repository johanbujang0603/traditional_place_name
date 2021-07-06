// **  Initial State
const loggedInUser = JSON.parse(localStorage.getItem("userData"))
const initialState = {
  isAutenticated: loggedInUser && !!loggedInUser.token,
  user: loggedInUser ? loggedInUser : null,
  userRole: "admin",
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return { ...state, isAutenticated: true, user: action.payload, userRole: action.payload.role, error: null }
    }
    case "LOGIN_FAILED": {
      return { ...state, isAutenticated: false, error: action.payload.error }
    }
    case "LOGOUT": {
      return { ...state, isAutenticated: false, user: null }
    }
    case "UPDATE_USER": {
      return { ...state, isAutenticated: false, user: action.payload }
    }
    default: {
      return state
    }
  }
}

export default authReducer
