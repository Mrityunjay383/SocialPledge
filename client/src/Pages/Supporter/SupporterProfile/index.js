import React, { useEffect, useState } from "react";
import SupHeader from "../../../Components/Supporter/Header";
import { useNavigate, useParams } from "react-router-dom";
import CtaBtn from "../../../Components/Original/CtaBtn";
import "./index.css";
import { Supporter } from "../../../service";
import { toast } from "react-toastify";

const SupporterProfile = ({ supporterData, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { supporterUserName } = useParams();

  const logout = async () => {
    const res = await Supporter.logout();

    if (res.data.success) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (
      supporterUserName !== supporterData.userName &&
      supporterData.userName !== ""
    ) {
      navigate(`/${supporterData.userName}/profile`);
    }
  }, []);

  const [activeChange, setActiveChange] = useState(false);
  const [changeVar, setChangeVar] = useState({ type: "", updatedVal: "" });

  const changeUpdateCon = (type) => {
    setActiveChange(true);
    setChangeVar((curr) => {
      return {
        ...curr,
        type,
        updatedVal:
          type === "Name" ? supporterData.name : supporterData.userName,
      };
    });
  };

  const updateChange = async () => {
    if (changeVar.type === "Name") {
      if (supporterData.name === changeVar.updatedVal) {
        return toast.error("Updated Name can't be same as previous one");
      }
    } else if (changeVar.type === "UserName") {
      if (supporterData.userName === changeVar.updatedVal) {
        return toast.error("Updated UserName can't be same as previous one");
      }
    }

    const res = await Supporter.updateSup({
      supporter_id: supporterData.supporter_id,
      ...changeVar,
    });

    if (res.status === 200) {
      window.location.reload();
    } else {
      toast.error(res.data);
    }
  };

  return (
    <div>
      <SupHeader supporterData={supporterData} />

      <div className={"midCon"}>
        <div className="card proCard">
          <div className="card-body">
            {!activeChange ? (
              <div className="inner">
                <div
                  style={{
                    fontSize: "18px",
                    letterSpacing: ".5px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    style={{ height: "15vh" }}
                    src={supporterData.logo}
                    alt={"SupporterLogo"}
                  />
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    letterSpacing: ".5px",
                    marginTop: "15px",
                  }}
                >
                  {supporterData.name}
                  <span
                    className="color__gray"
                    style={{ marginLeft: "10px", marginTop: "5px" }}
                  >
                    {supporterData.userName}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <label className="form-check-label">{`Update ${changeVar.type}`}</label>
                <input
                  placeholder={`Enter new ${changeVar.type}`}
                  value={changeVar.updatedVal}
                  autoFocus={true}
                  style={{
                    width: "100%",
                    border: "1px solid gray",
                    color: "gray",
                  }}
                  onChange={(e) => {
                    setChangeVar((curr) => {
                      return { ...curr, updatedVal: e.target.value };
                    });
                  }}
                />
                <CtaBtn Text={"Done"} fontSize={13} onClick={updateChange} />
              </div>
            )}
          </div>
          <div className="card-footer">
            <div className="inner">
              <div>
                <CtaBtn
                  Text={"Change Name"}
                  fontSize={13}
                  onClick={() => changeUpdateCon("Name")}
                />
              </div>
              <div>
                <CtaBtn
                  Text={"Change Username"}
                  fontSize={13}
                  onClick={() => changeUpdateCon("UserName")}
                />
              </div>
            </div>
          </div>
          <div className="logOutCon">
            <CtaBtn Text={"Logout"} fontSize={15} onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupporterProfile;
