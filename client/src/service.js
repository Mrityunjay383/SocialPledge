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

export const Index = {
  contactUs: (data) => {
    return request("POST", "/contact_us", data);
  },
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
  getPledges: (data) => {
    return request("POST", "/pledge/pledges", data);
  },
  launch: () => {
    return request("GET", "/pledge/launch");
  },
};

export const Supporter = {
  root: () => {
    return request("GET", "/supporter");
  },
  login: (data) => {
    return request("POST", "/supporter/login", data);
  },
  indieSup: () => {
    return request("GET", "/supporter/indieSup");
  },
  updateSup: (data) => {
    return request("POST", "/supporter/updateSup", data);
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
  indieCertificate: (data) => {
    return request("POST", "/certificate/get_indie_certificate", data);
  },
};

export const Report = {
  reportData: (data) => {
    return request("POST", "/report/report_Data", data);
  },
  genReport: (data) => {
    return request("POST", "/report/genReport", data);
  },
};
