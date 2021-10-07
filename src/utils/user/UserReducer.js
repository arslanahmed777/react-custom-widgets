import { UserActionTypes } from "./UserActionTypes";
const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: "",
};

const setSelectedProjects = (userobject, project_id) => {
  const { selectedProjects } = userobject;
  selectedProjects.push(project_id);
  return { ...userobject, selectedProjects };
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
      };
    }
    case UserActionTypes.SET_CURRENT_USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionTypes.SET_CURRENT_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case UserActionTypes.SET_CURRENT_USER_SELECTED_PROJECTID: {
      return {
        ...state,
        currentUser: setSelectedProjects(state.currentUser, action.payload),
      };
    }
    case UserActionTypes.SET_CURRENT_USER_LOGOUT: {
      return {
        ...state,
        currentUser: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;
