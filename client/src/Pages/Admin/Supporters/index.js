import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../../Components/Admin/Header";
import { Supporter } from "../../../service";
import { AiFillEdit } from "react-icons/ai";
import CtaBtn from "../../../Components/Original/CtaBtn";
import AddSupporterModel from "../../../Components/Admin/AddSupporterModel";
import EditSupporterModel from "../../../Components/Admin/EditSupporterModel";

const Supporters = ({ adminData }) => {
  const navigate = useNavigate();
  const { adminUserName } = useParams();

  const [supporter, setSupporter] = useState();
  useEffect(() => {
    if (adminUserName !== adminData.userName && adminData.userName !== "") {
      navigate(`/${adminData.userName}/supporters`);
    }
  }, []);

  const fetchSupporters = async () => {
    try {
      setEditSupporterUN("");
      const res = await Supporter.list();

      if (res.status === 200) {
        setSupporter(res.data.supporters);
      }
    } catch (err) {
      console.log(`#2023281234824599 err`, err);
    }
  };

  useEffect(() => {
    fetchSupporters();
  }, []);

  const [addSupporterModalIsOpen, setAddSupporterModalIsOpen] =
    React.useState(false);

  const [editSupporterUN, setEditSupporterUN] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);

  useEffect(() => {
    if (editSupporterUN !== "") {
      setEditModalIsOpen(true);
    }
  }, [editSupporterUN]);

  return (
    <div className={"centerCon"}>
      <EditSupporterModel
        modalIsOpen={editModalIsOpen}
        setIsOpen={setEditModalIsOpen}
        editSupporterUN={editSupporterUN}
        fetchSupporters={fetchSupporters}
      />

      <AddSupporterModel
        modalIsOpen={addSupporterModalIsOpen}
        setIsOpen={setAddSupporterModalIsOpen}
        fetchSupporters={fetchSupporters}
      />

      <AdminHeader adminData={adminData} />

      <div className={"pledgesCon"}>
        <CtaBtn
          Text={"Add New Supporter"}
          className={"newPledgeBtn"}
          onClick={() => setAddSupporterModalIsOpen(true)}
        />

        <div className={"pledgeRow"}>
          <div>Logo</div>
          <div>Name</div>
          <div>UserName</div>
          <div>New Limit</div>
          <div>Repeat Limit</div>
          <div>Priority</div>
          <div style={{ width: "5%", textAlign: "right" }}></div>
        </div>

        {supporter &&
          supporter.map((supporter, i) => {
            return (
              <div key={i} className={"pledgeRow"}>
                <div>
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={supporter.logo}
                    alt={"as"}
                  />
                </div>
                <div>{supporter.name}</div>
                <div>{supporter.userName}</div>
                <div>
                  {supporter.newCount} / {supporter.newLimit}
                </div>
                <div>
                  {supporter.repCount} / {supporter.repLimit}
                </div>
                <div>{supporter.priority ? "Yes" : "No"}</div>

                <div
                  style={{
                    width: "5%",
                    textAlign: "right",
                    fontSize: "1.6rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditSupporterUN(supporter.userName);
                  }}
                >
                  {" "}
                  <AiFillEdit />{" "}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Supporters;
