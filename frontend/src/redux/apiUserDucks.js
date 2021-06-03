import axios from 'axios'
const initialData = {
  userDB: {},
};

const GET_USER_API = "GET_USER_API";
const ERROR_GET_USER_API = "ERROR_GET_USER_API";

export default function apiUserReducer(state = initialData, action) {
  switch (action.type) {
    case GET_USER_API:
      return { ...state, userDB: action.payload };
    case ERROR_GET_USER_API:
      return { ...state, userDB: state.userDB };
    default:
      return state;
  }
}

export const getUser = () => async(dispatch) => {
  var data = JSON.parse(localStorage.getItem("auth"));
  if (data) {
    let config = {
      headers: {
        token: data.token,
      },
      params: {
        userId: data.userData._id,
      },
    };
    axios
      .get("/user", config)
      .then((res) => {
        dispatch({
            type: GET_USER_API,
            payload: res.data.data
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }else{
    dispatch({
      type: ERROR_GET_USER_API,
      payload: null
    })
  }
}
