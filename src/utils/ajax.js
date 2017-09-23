import axios from "axios";
import { getStore } from "@/utils/localStorage";
import { appHost, appRoot } from "@/config/config";
const rootUrl = appHost + appRoot;
let extremely = true;
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
      } else if (error.request) {
        if(extremely){
          this.errorTips("服务器异常!");
          this.disable = false;
        }
        extremely = false;

      } else {
        // console.error("Error", error.message);
      }
      // console.error("Config", error.config);
    });
}
