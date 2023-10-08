import React, { useEffect, useState } from "react";
// import "./index.css";
import Modal from "react-modal";
import { AiFillCloseSquare } from "react-icons/ai";
import CtaBtn from "../../Original/CtaBtn";
import { toast } from "react-toastify";
import { Pledge } from "../../../service";
import { MutatingDots } from "react-loader-spinner";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -45%)",
    width: "60vw",
    maxHeight: "80vh",
  },
};

Modal.setAppElement("#root");

const EditPledgeModel = ({
  modalIsOpen,
  setIsOpen,
  editPledgeName,
  fetchPledges,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  const [pledgeData, setPledgeData] = useState();

  const fetchPledgeData = async () => {
    try {
      const res = await Pledge.getIndiePledge({ pledgeName: editPledgeName });

      if (res.status === 200) {
        setPledgeData(res.data.pledge);
      }
    } catch (err) {
      console.log(`#2023281223351564 err`, err);
    }
  };

  useEffect(() => {
    fetchPledgeData();
  }, [editPledgeName]);

  const [pledgeAddLoading, setPledgeAddLoading] = useState(false);

  const updatePledge = async () => {
    try {
      setPledgeAddLoading(true);

      const res = await Pledge.update(pledgeData);

      if (res.status === 200) {
        fetchPledges();
        toast.success("Pledge Updated Successfully!");
        setIsOpen(false);
        setPledgeAddLoading(false);
      }
    } catch (err) {
      console.log(`#20232812382625 err`, err);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {pledgeAddLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MutatingDots
            height="100"
            width="100"
            color="#FF5A60"
            secondaryColor="#FF5A60"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          Updating Pledge, please wait...
        </div>
      )}

      {!pledgeAddLoading && pledgeData && (
        <>
          <div className={"modelHead"}>
            <h2>Update Pledge</h2>
            <AiFillCloseSquare
              className={"closeIcon"}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className={"proRow"}>
            <div className="delText">
              <input
                type="text"
                placeholder={"Pledge Name"}
                value={pledgeData.name}
                onChange={(e) =>
                  setPledgeData((curr) => {
                    return { ...curr, name: e.target.value };
                  })
                }
              />
            </div>
            <div className="delText">
              <textarea
                placeholder={"About"}
                value={pledgeData.about}
                rows={2}
                onChange={(e) =>
                  setPledgeData((curr) => {
                    return { ...curr, about: e.target.value };
                  })
                }
              />
            </div>
          </div>

          <div className={"proRow"}>
            <div className="delDate">
              <label>Start Date:</label>
              <input
                type="datetime-local"
                placeholder={"Start Date"}
                value={
                  new Date(pledgeData.liveDate * 1000)
                    .toISOString()
                    .split(".")[0]
                }
                onChange={(e) =>
                  setPledgeData((curr) => {
                    return {
                      ...curr,
                      liveDate: new Date(e.target.value).getTime() / 1000,
                    };
                  })
                }
              />
            </div>
            <div className="delDate">
              <label>End Date:</label>
              <input
                type="datetime-local"
                placeholder={"End Date"}
                value={
                  pledgeData.endDate
                    ? new Date(pledgeData.endDate * 1000)
                        .toISOString()
                        .split(".")[0]
                    : ""
                }
                onChange={(e) =>
                  setPledgeData((curr) => {
                    return {
                      ...curr,
                      endDate: new Date(e.target.value).getTime() / 1000,
                    };
                  })
                }
              />
            </div>
          </div>

          <CtaBtn Text={"Update"} fontSize={16} onClick={updatePledge} />
        </>
      )}
    </Modal>
  );
};

export default EditPledgeModel;
