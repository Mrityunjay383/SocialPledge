import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { AiFillCloseSquare } from "react-icons/ai";
import CtaBtn from "../../Original/CtaBtn";
import axios from "axios";
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

const AddSupporterModel = ({ modalIsOpen, setIsOpen, fetchSupporters }) => {
  function closeModal() {
    setIsOpen(false);
  }

  const [supporterData, setSupporterData] = useState({});

  const [img1Uploaded, setImg1Uploaded] = useState(false);

  const uploadImg = async () => {
    setSupporterAddLoading(true);

    if (
      !supporterData.name ||
      !supporterData.userName ||
      !supporterData.logo ||
      !supporterData.password ||
      !supporterData.newLimit ||
      !supporterData.repLimit
    ) {
      setSupporterAddLoading(false);

      return toast.error("Please provide all details");
    }

    let reader = new FileReader();
    reader.readAsDataURL(supporterData.logo);
    reader.onload = async () => {
      const ImgUploadUrl =
        "https://api.cloudinary.com/v1_1/ddb1evz5g/image/upload";
      let base64Img = `${reader.result}`;

      let uploadData = {
        file: base64Img,
        upload_preset: "PublicPoster",
      };

      await axios
        .post(ImgUploadUrl, uploadData, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then(async (response) => {
          setImg1Uploaded(true);
          setSupporterData((curr) => {
            return { ...curr, logo: response.data.url };
          });
        })
        .catch((err) => {
          console.log(`#202358193656188 Upload Error`, err);
        });
    };
  };

  const addSupporter = async () => {
    try {
      const res = await Supporter.createNew(supporterData);

      if (res.status === 201) {
        fetchSupporters();
        toast.success("Supporter Added Successfully");
        setIsOpen(false);
      } else {
        toast.error("Some Error Occurred");
      }
      setSupporterAddLoading(false);
    } catch (err) {
      console.log(`#2023281214520716 err`, err);
    }
  };

  useEffect(() => {
    if (img1Uploaded) {
      addSupporter();
    }
  }, [img1Uploaded]);

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
          Adding Supporter, please wait...
        </div>
      )}

      {!supporterAddLoading && (
        <>
          <div className={"modelHead"}>
            <h2>Add A New Supporter</h2>
            <AiFillCloseSquare
              className={"closeIcon"}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className={"proRow"}>
            <div className="delText">
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
              <textarea
                placeholder={"UserName"}
                rows={1}
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
              <input
                type="text"
                placeholder={"Set Password"}
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, password: e.target.value };
                  })
                }
              />
            </div>
            <div className="delText">
              <label>Upload Logo:</label>
              <input
                type={"file"}
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, logo: e.target.files[0] };
                  })
                }
              />
            </div>
          </div>

          <div className={"proRow"}>
            <div className="delText">
              <input
                type="number"
                placeholder={"Set New Limit"}
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, newLimit: e.target.value };
                  })
                }
              />
            </div>
            <div className="delText">
              <input
                type="number"
                placeholder={"Set Repeat Limit"}
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
                // checked={formData.currStudying}
                type="checkbox"
                onChange={(e) =>
                  setSupporterData((curr) => {
                    return { ...curr, priority: e.target.checked };
                  })
                }
              />
            </div>
          </div>

          <CtaBtn Text={"Add"} onClick={uploadImg} />
        </>
      )}
    </Modal>
  );
};

export default AddSupporterModel;
