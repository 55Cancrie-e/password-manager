import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')
    if (token) {
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/api/users/register" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
        const rs = await instance.get(`api/user/me/access-token`,{
            headers: {
            'x-refresh-token': localStorage.getItem('refresh'),
            '_id': localStorage.getItem('_id')
            }
        });
          console.log(rs)
          const { accessToken } = rs.data;
          localStorage.setItem('access', accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;