import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";

const server = axios.create({
  baseURL: "https://modavastraa.com",
});

server.interceptors.request.use(
  async (request) => {
    let token = localStorage.getItem("token");
    let refreshToken = localStorage.getItem("refresh_token");
    request.headers["Content-Type"] = "application/json";
    if (token) {
      request.headers["Authorization"] = JSON.parse(token);
    }

    const user = jwt_decode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(isExpired);
    if (!isExpired) return request;

    const response = await axios.post(
      `http://api.modavastra.com:9090/oauth/token`,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: "abh",
      }
    );
    localStorage.setItem("token", "Bearer " + response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    request.headers["Authorization"] = JSON.parse(
      localStorage.getItem("token")
    );
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default server;
