import axios from "axios";
import { getStore } from "@/utils/localStorage";
import { appHost, appRoot } from "@/config/config";
const rootUrl = appHost + appRoot;
export default function(
  {
    type = "get",
    url = "",
    data = {},
    header = { authorization: getStore("authorization") },
    success = null,
    error = null
  } = {}
) {
  const params = type.toLowerCase() == "get" ? "params" : "data";
  const config = {
    [params]: data,
    baseURL: rootUrl,
    url: url,
    headers: header,
    method: type,
    timeout: 10000
  };
  axios(config)
    .then(response => {
      if (response.data.code == "401" || response.data.message == "身份验证失败!") {
        Utils.logOut();
        return;
      }
      success(response.data, this);
      this.disable = false;
    })
    .catch(error => {
      if (error.response) {
        console.log("response", error.response);
      } else if (error.request) {
        this.errorTips("服务器异常!");
        this.disable = false;
      } else {
        console.log("Error", error.message);
      }
      console.log("Config", error.config);
    });
}
