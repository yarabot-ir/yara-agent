import axios from 'axios';
const AgentToken = import.meta.env.VITE_BASE_AGENT_TOKEN;

const BASE_URL = import.meta.env.VITE_BASE_URL;

const app = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: AgentToken },
  // withCredentials: true,
  // maxBodyLength: Infinity,
});

app.interceptors.request.use(
  (res) => res,
  (err) => err
);

app.interceptors.response.use(
  (res) => res,
  (err) => err
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
