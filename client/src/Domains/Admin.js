import React, { useEffect, useState } from "react";
import "../App.css";

//importing Router functionality
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Admin } from "../service";
import Footer from "../Components/Original/Footer";
import ScrollToTop from "../ScrollToTop";
import AdminHome from "../Pages/Admin/Home";
import AdminAuth from "../Pages/Admin/AdminAuth";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminReports from "../Pages/Admin/Report";
import AdminPledges from "../Pages/Admin/Pledges";

const AdminScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState({
    admin_id: "",
    userName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const valLogin = async () => {
    const res = await Admin.root();

    if (res.status === 200) {
      await setAdminData({
        admin_id: res.data.admin.admin_id,
        userName: res.data.admin.userName,
      });
      await setIsLoggedIn(true);
    } else {
      await setAdminData({
        admin_id: "",
        userName: "",
      });
      await setIsLoggedIn(false);
    }
  };

  const authFunc = async () => {
    await setIsLoading(true);
    await valLogin();
    await setIsLoading(false);
  };

  useEffect(() => {
    authFunc();
  }, [isLoggedIn]);

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <LoadingScreen
          loading={isLoading}
          bgColor="#f1f1f1"
          spinnerColor="#FF5A60"
          textColor="#FF5A60"
          logoSrc="https://res.cloudinary.com/ddb1evz5g/image/upload/v1689918515/SocialPledgeLogo_usyssj.png"
          text="Loading..."
        >
          <ToastContainer />

          <Routes>
            {/*Home Route have Landing Page */}
            <Route
              path="/"
              element={
                <div>
                  <AdminHome />
                </div>
              }
            />

            <Route
              path="/:adminUserName"
              element={
                <div>
                  {isLoggedIn ? (
                    <AdminDashboard adminData={adminData} />
                  ) : (
                    <AdminAuth />
                  )}
                </div>
              }
            />

            <Route
              path="/:adminUserName/report"
              element={
                <div>
                  {isLoggedIn ? (
                    <AdminReports adminData={adminData} />
                  ) : (
                    <AdminAuth />
                  )}
                </div>
              }
            />
            <Route
              path="/:adminUserName/pledges"
              element={
                <div>
                  {isLoggedIn ? (
                    <AdminPledges adminData={adminData} />
                  ) : (
                    <AdminAuth />
                  )}
                </div>
              }
            />

            <Route
              path="/:adminUserName/add_supporter"
              element={
                <div>
                  {isLoggedIn ? (
                    <AdminDashboard adminData={adminData} />
                  ) : (
                    <AdminAuth />
                  )}
                </div>
              }
            />
          </Routes>
          <Footer />
        </LoadingScreen>
      </div>
    </Router>
  );
};

export default AdminScreen;
