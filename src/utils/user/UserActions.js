import { UserActionTypes } from "./UserActionTypes";
import axios from "axios";
export const setCurrentUserAfterSignup = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setCurrentUserLogout = () => ({
  type: UserActionTypes.SET_CURRENT_USER_LOGOUT,
});

export const setCurrentUserSelectedProjectid = (project_id) => ({
  type: UserActionTypes.SET_CURRENT_USER_SELECTED_PROJECTID,
  payload: project_id,
});

// export const incrementcount = () => {
//   return new Promise((res) =>
//     setTimeout(() => {
//       res();
//     }, 4000)
//   );
// };

export const setCurrentUser = (user) => async (dispatch, getState) => {
  dispatch({ type: UserActionTypes.SET_CURRENT_USER_LOADING }); // setting the loader

  const res = await axios.post("http://localhost:5000/signIn", user, {
    headers: {
      "content-type": "application/json",
    },
  });
  const { data } = res;

  if (data.error) {
    dispatch({
      type: UserActionTypes.SET_CURRENT_USER_ERROR,
      payload: data.error,
    });
  } else {
    const { token, user } = data; // getting user and token
    user.token = token; // adding token in user object
    dispatch({
      type: UserActionTypes.SET_CURRENT_USER,
      payload: user,
    });
  }
};
