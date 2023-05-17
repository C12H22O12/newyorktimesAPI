import { url } from "@constant/variable";
import axios from "axios";

export const getAsync = (additionalUrl: string) => {
  console.log(`${url}${additionalUrl}`)
  return axios.get(`${url}${additionalUrl}`, { responseType: "json" })
    .then((res) => {
      return { isSuccess: true, result: res.data.response };
    })
    .catch((err) => {
      return { isSuccess: false, result: err.response.status };
    });
};
