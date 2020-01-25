import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-sandwich-a4a30.firebaseio.com/"
});

export default instance;
