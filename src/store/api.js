import axios from "axios";
export default axios.create({
  baseURL: "https://api.autographamt.com/v1/",
  timeout: 15000
});
