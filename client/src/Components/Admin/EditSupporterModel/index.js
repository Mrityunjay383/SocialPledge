import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiFillCloseSquare } from "react-icons/ai";
import CtaBtn from "../../Original/CtaBtn";
import { toast } from "react-toastify";
import { Supporter } from "../../../service";
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

const EditSupporterModel = ({
  modalIsOpen,
  setIsOpen,
  editSupporterUN,
  fetchSupporters,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  const [supporterData, setSupporterData] = useState();

  const fetchSupporterData = async () => {
    try {
      const res = await Supporter.indieSupForAdmin({
        userName: editSupporterUN,
      });

      if (res.status === 200) {
        setSupporterData(res.data.supporter);
      }
    } catch (err) {
      console.log(`#2023281223351564 err`, err);
    }
  };

  const updateSupporter = async () => {
    try {
      setSupporterAddLoading(true);

      const res = await Supporter.updateSupByAdmin({ supporterData });

      if (res.status === 200) {
        fetchSupporters();
        toast.success("Successfully updated");
        setIsOpen(false);
      } else {
        toast.error("Some Error occurred");
      }

      setSupporterAddLoading(false);
    } catch (err) {
      console.log(`#2023281223351564 err`, err);
    }
  };

  useEffect(() => {
    fetchSupporterData();
  }, [editSupporterUN]);

  const deleteSupporter = async () => {
    try {
      const res = await Supporter.delete({ supporterId: supporterData._id });

      if (res.status === 200) {
        fetchSupporters();
        toast.success("Supporter Deleted successfully");
        setIsOpen(false);
      }
    } catch (err) {
      console.log(`#2023283145117699 err`, err);
    }
  };

  const [supporterAddLoading, setSupporterAddLoading] = useState(false);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {supporterAddLoading && (
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
          Updating Supporter, please wait...
        </div>
      )}

      {!supporterAddLoading && supporterData && (
        <>
          <div className={"modelHead"}>
            <h2>Update Supporter</h2>
            <AiFillCloseSquare
              className={"closeIcon"}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className={"proRow"}>
            <div className="delText">
              <label>Supporter Name:</label>
              <input
                type="text"
                placeholder={"Supporter Name"}
                value={supporterData.name}
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, name: e.target.value };
                  })
                }
              />
            </div>
            <div className="delText">
              <label>Supporter UserName:</label>

              <input
                type="text"
                placeholder={"UserName"}
                value={supporterData.userName}
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, userName: e.target.value };
                  })
                }
              />
            </div>
          </div>

          <div className={"proRow"}>
            <div className="delText">
              <label>New Download Limit:</label>

              <input
                type="number"
                placeholder={"Set New Limit"}
                value={supporterData.newLimit}
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, newLimit: e.target.value };
                  })
                }
              />
            </div>
            <div className="delText">
              <label>Repeat Download Limit:</label>

              <input
                type="number"
                placeholder={"Set Repeat Limit"}
                value={supporterData.repLimit}
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, repLimit: e.target.value };
                  })
                }
              />
            </div>
          </div>

          <div className={"proRow"}>
            <div className="checkbox">
              Priority
              <input
                checked={supporterData.priority}
                type="checkbox"
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, priority: e.target.checked };
                  })
                }
              />
            </div>
          </div>

          <CtaBtn
            Text={"Delete"}
            className={"delBtn"}
            onClick={deleteSupporter}
          />
          <CtaBtn Text={"Update"} onClick={updateSupporter} />
        </>
      )}
    </Modal>
  );
};

export default EditSupporterModel;
