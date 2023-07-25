import axios from "axios";

// const baseUrl = "http://localhost:5000";
const baseUrl = "https://socialpledge.cyclic.app";

const request = async (method, url, data) => {
  const config = {
    validateStatus: false,
    withCredentials: true,
  };

  if (method === "GET") {
    return await axios.get(`${baseUrl}${url}`, config);
  } else if (method === "POST") {
    return await axios.post(`${baseUrl}${url}`, data, config);
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
  getHomePledges: () => {
    return request("GET", "/pledge/get_home_pledges");
  },
  getIndiePledge: (data) => {
    return request("POST", "/pledge/get_indie_pledge", data);
  },
};

export const Supporter = {
  root: () => {
    return request("GET", "/supporter");
  },
  login: (data) => {
    return request("POST", "/supporter/login", data);
  },
  indieSup: (data) => {
    return request("POST", "/supporter/indieSup", data);
  },
  getAvaSupporter: () => {
    return request("GET", "/supporter/get_ava");
  },
  logout: () => {
    return request("GET", "/supporter/logout");
  },
};

export const Certificate = {
  newDownload: (data) => {
    return request("POST", "/certificate/new_download", data);
  },
};
