import axios from "axios";

const baseUrl = "http://localhost:5000";

const request = async (method, url, data) => {
  if (method === "GET") {
    return await axios.get(`${baseUrl}${url}`, {
      validateStatus: false,
      withCredentials: true,
    });
  } else if (method === "POST") {
    return await axios.post(`${baseUrl}${url}`, data, {
      validateStatus: false,
      withCredentials: true,
    });
  }
};

export const Auth = {
  root: () => {
    return request("GET", "/");
  },
  login: (data) => {
    return request("POST", "/auth/login", data);
  },
  logout: () => {
    return request("GET", "/auth/logout");
  },
  opt: (data) => {
    return request("POST", "/auth/otp", data);
  },
  register: (data) => {
    return request("POST", "/auth/register", data);
  },
};

export const Pledge = {
  getPledges: () => {
    return request("GET", "/pledge/get_all_pledges");
  },
  getIndiePledge: (data) => {
    return request("POST", "/pledge/get_indie_pledge", data);
  },
};
