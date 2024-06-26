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
  profile: (data) => {
    return request("POST", "/profile", data);
  },
  saveDel: (data) => {
    return request("POST", "/saveDel", data);
  },
  profileSteps: () => {
    return request("GET", "/profile_step");
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
  createNew: (data) => {
    return request("POST", "/pledge/create_new", data);
  },
  getHomePledges: () => {
    return request("GET", "/pledge/get_home_pledges");
  },
  getIndiePledge: (data) => {
    return request("POST", "/pledge/get_indie_pledge", data);
  },
  getPledges: (data) => {
    return request("POST", "/pledge/pledges", data);
  },
  update: (data) => {
    return request("POST", "/pledge/update", data);
  },
  delete: (data) => {
    return request("POST", "/pledge/delete", data);
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
  indieSupForAdmin: (data) => {
    return request("POST", "/supporter/indie_sup_for_admin", data);
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
  list: () => {
    return request("GET", "/supporter/list");
  },
  createNew: (data) => {
    return request("POST", "/supporter/create_new", data);
  },
  updateSupByAdmin: (data) => {
    return request("POST", "/supporter/update_sup_by_admin", data);
  },
  delete: (data) => {
    return request("POST", "/supporter/delete_sup_for_admin", data);
  },
};

export const Certificate = {
  newDownload: (data) => {
    return request("POST", "/certificate/new_download", data);
  },
  indieCertificate: (data) => {
    return request("POST", "/certificate/get_indie_certificate", data);
  },
  isCertificateExist: (data) => {
    return request("POST", "/certificate/is_certificate_exist", data);
  },
  certificateCount: () => {
    return request("GET", "/certificate/certificate_count");
  },
};

export const Report = {
  reportData: (data) => {
    return request("POST", "/report/report_Data", data);
  },
  adminReportData: (data) => {
    return request("POST", "/report/admin_report_Data", data);
  },
  genReport: (data) => {
    return request("POST", "/report/genReport", data);
  },
  adminDashData: () => {
    return request("GET", "/report/admin_dashboard_Data");
  },
};

export const Admin = {
  root: () => {
    return request("GET", "/admin");
  },
  login: (data) => {
    return request("POST", "/admin/login", data);
  },
  logout: () => {
    return request("GET", "/admin/logout");
  },
};
