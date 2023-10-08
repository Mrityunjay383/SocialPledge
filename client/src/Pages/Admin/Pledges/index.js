import React, { useEffect, useState } from "react";
import AdminHeader from "../../../Components/Admin/Header";
import { Pledge } from "../../../service";
import "./index.css";
import CtaBtn from "../../../Components/Original/CtaBtn";
import { AiFillEdit } from "react-icons/ai";
import EditPledgeModel from "../../../Components/Admin/EditPledgeModel";

const AdminPledges = ({ adminData }) => {
  const [pledges, setPledges] = useState([]);

  const fetchPledges = async () => {
    try {
      const res = await Pledge.getPledges({ filter: "All" });

      if (res.status === 200) {
        setPledges(res.data.pledgesData);
      }
    } catch (err) {
      console.log(`#20232811908367 err`, err);
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [editPledgeName, setEditPledgeName] = useState("");
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);

  useEffect(() => {
    if (editPledgeName !== "") {
      setEditModalIsOpen(true);
    }
  }, [editPledgeName]);

  useEffect(() => {
    fetchPledges();
  }, []);

  return (
    <div className={"centerCon"}>
      <AdminHeader adminData={adminData} />

      <EditPledgeModel
        modalIsOpen={editModalIsOpen}
        setIsOpen={setEditModalIsOpen}
        editPledgeName={editPledgeName}
        fetchPledges={fetchPledges}
      />

      <EditPledgeModel
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        fetchPledges={fetchPledges}
      />

      <div className={"pledgesCon"}>
        <CtaBtn
          Text={"Add New Pledge"}
          className={"newPledgeBtn"}
          onClick={() => setIsOpen(true)}
        />

        <div className={"pledgeRow"}>
          <div>Image</div>
          <div>Preview</div>
          <div>Name</div>
          <div>Live Date</div>
          <div>End Date</div>
          <div style={{ width: "5%", textAlign: "right" }}></div>
        </div>

        {pledges.length !== 0 &&
          pledges.map((pledge, i) => {
            return (
              <div key={i} className={"pledgeRow"}>
                <div>
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={pledge.url}
                    alt={"as"}
                  />
                </div>
                <div>
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={pledge.previewURL}
                    alt={"ada"}
                  />
                </div>
                <div>{pledge.name}</div>
                <div>{new Date(pledge.liveDate * 1000).toLocaleString()}</div>
                <div>
                  {pledge.endDate
                    ? new Date(pledge.endDate * 1000).toLocaleString()
                    : "-"}
                </div>
                <div
                  style={{
                    width: "5%",
                    textAlign: "right",
                    fontSize: "1.6rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditPledgeName(pledge.name.replaceAll(" ", "_"));
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

export default AdminPledges;
