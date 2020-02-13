export const loadUser = () => dispatch => {
    let user = JSON.parse(localStorage.getItem("user"))
    if (localStorage.token) {
      dispatch({
        type: "LOAD_USER",
        payload: {
          token: localStorage.token,
          user
        }
      })
    }
}
  