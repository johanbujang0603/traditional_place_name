// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { ...data.user, token: data.token }
    })
    localStorage.setItem("userData", JSON.stringify({ ...data.user, token: data.token }))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('userData')
  }
}

// ** Update Logged User
export const updateUser = data => {
  return dispatch => {
    dispatch({
      type: "UPDATE_USER",
      payload: data
    })
    localStorage.setItem("userData", JSON.stringify(data))
  }
}