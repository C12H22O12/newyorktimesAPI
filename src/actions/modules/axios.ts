import { url } from "@src/constant/variable";
import axios from "axios";

const API = axios.create({ baseURL: url });

export const getAsync = (additionalUrl: string) => {
  return API.get(additionalUrl, { responseType: "json" })
    .then((res) => {
      return { isSuccess: true, result: res.data.response };
    })
    .catch((err) => {
      return { isSuccess: false, result: err.response.status };
    });
};
