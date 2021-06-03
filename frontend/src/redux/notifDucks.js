import axios from "axios";
const initialData = {
  notifications: [],
};

const GET_DATA_NOTIF = "GET_DATA_NOTIF";
const ERROR_DATA_NOTIF = "ERROR_DATA_NOTIF";

export default function notifReducer(state = initialData, action) {
  switch (action.type) {
    case GET_DATA_NOTIF:
      return { ...state, notifications: action.payload };
    case ERROR_DATA_NOTIF:
      return { ...state, noticiations: state };
    default:
      return state;
  }
}

export const getNotifications = () => async (dispatch) => {
  let data = JSON.parse(localStorage.getItem("auth"));
  if (data) {
    let config = {
      headers: {
        token: data.token,
      },
    };
    axios
      .get("/notifications", config)
      .then((res) => {
        if (res.data.status === "success") {
          let data = res.data.data;
          let index = data.length - 1;

          while (index >= 0) {
            if (data[index].readed === true) {
              data.splice(index, 1);
            }
          
            index -= 1;
          }
          dispatch({
            type: GET_DATA_NOTIF,
            payload: data
          })
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
};
