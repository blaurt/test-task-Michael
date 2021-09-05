import axios from "axios";
import axiosRetry from "axios-retry";
/**
 * Init retry plugin with 
 * - retry count = 1
 * - retry delay = 1 sec
 */
axiosRetry(axios, {
  retries: 1,
  retryDelay: (retryCount, error) => {
    console.log("🚀 ~ axiosRetry:retryCount,error", retryCount, error);
    return 1;
  },
});

export class HttpClientService {
  public async get(url: string) {
    return axios.get(url);
  }

  public async post(url: string) {
    return axios.post(url);
  }
  public async put(url: string) {
    return axios.put(url);
  }
}
