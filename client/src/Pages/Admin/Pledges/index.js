import React, { useEffect, useState } from "react";
import AdminHeader from "../../../Components/Admin/Header";
import { Pledge } from "../../../service";
import "./index.css";
import CtaBtn from "../../../Components/Original/CtaBtn";
import AddPledgeModel from "../../../Components/Admin/AddPledgeModel";

const AdminPledges = ({ adminData }) => {
  const [pledges, setPledges] = useState([]);

  const fetchPledges = async () => {
    try {
      const res = await Pledge.getPledges({ filter: "All" });

      if (res.status === 200) {
        console.log(`#202328119021951 res`, res.data);
        setPledges(res.data.pledgesData);
      }
    } catch (err) {
      console.log(`#20232811908367 err`, err);
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    fetchPledges();
  }, []);

  return (
    <div className={"centerCon"}>
      <AdminHeader adminData={adminData} />

      <AddPledgeModel
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminPledges;
