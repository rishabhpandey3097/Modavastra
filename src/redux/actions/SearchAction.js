import { ActionTypes } from "../constants/Types";
import axios from "axios";
import server from "./apis";
import { errorMessage, successMessage } from "./MessageAction";

const searchResults = (res) => {
  return {
    type: ActionTypes.GET_SEARCH_RESULTS,
    payload: res,
  };
};

export const getSearchResults = (str) => {
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let one = `http://api.modavastra.com:8080/v1/api/search/byProductName/${str}`;
    let two = `http://api.modavastra.com:8080/v1/api/search/byItemName/${str}`;
    let three = `http://api.modavastra.com:8080/v1/api/search/byItemDesinerName/${str}`;

    const requestOne = axios.get(one, {
      headers: {
        Authorization: token,
      },
    });
    const requestTwo = axios.get(two, {
      headers: {
        Authorization: token,
      },
    });
    const requestThree = axios.get(three, {
      headers: {
        Authorization: token,
      },
    });

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responesThree = responses[2];

          // use/access the results
          const results = [
            ...responseOne.data.data,
            ...responseTwo.data.data,
            ...responesThree.data.data,
          ];
          console.log(results);
          dispatch(searchResults(results));
        })
      )
      .catch((error) => {
        let message = "Something went wrong please try again!";
        if (!error.response) {
          message = "Network Error!";
        } else {
          message = error.response.message;
        }
        errorMessage(message);
      });
  };
};
