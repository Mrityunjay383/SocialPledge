import React, { useEffect, useState } from "react";
import "./index.css";
import Modal from "react-modal";
import { AiFillCloseSquare } from "react-icons/ai";
import CtaBtn from "../../Original/CtaBtn";
import axios from "axios";
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

const AddPledgeModel = ({ modalIsOpen, setIsOpen, fetchPledges }) => {
  function closeModal() {
    setIsOpen(false);
  }

  const [pledgeData, setPledgeData] = useState({});

  const [img1Uploaded, setImg1Uploaded] = useState(false);

  const [img2Uploaded, setImg2Uploaded] = useState(false);

  const uploadImg = async () => {
    setPledgeAddLoading(true);

    if (
      !pledgeData.name ||
      !pledgeData.about ||
      !pledgeData.url ||
      !pledgeData.previewURL ||
      !pledgeData.liveDate
    ) {
      setPledgeAddLoading(false);

      return toast.error("Please provide all details");
    }

    let reader = new FileReader();
    reader.readAsDataURL(pledgeData.url);
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
          setPledgeData((curr) => {
            return { ...curr, url: response.data.url };
          });
        })
        .catch((err) => {
          console.log(`#202358193656188 Upload Error`, err);
        });
    };

    let reader2 = new FileReader();
    reader2.readAsDataURL(pledgeData.previewURL);
    reader2.onload = async () => {
      const ImgUploadUrl =
        "https://api.cloudinary.com/v1_1/ddb1evz5g/image/upload";
      let base64Img = `${reader2.result}`;

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
          setImg2Uploaded(true);
          setPledgeData((curr) => {
            return { ...curr, previewURL: response.data.url };
          });
        })
        .catch((err) => {
          console.log(`#202358193656188 Upload Error`, err);
        });
    };
  };

  const addPledge = async () => {
    try {
      const res = await Pledge.createNew(pledgeData);

      if (res.status === 201) {
        fetchPledges();
        toast.success("Pledge Added Successfully");
        setPledgeAddLoading(false);
        setIsOpen(false);
      }
    } catch (err) {
      console.log(`#2023281214520716 err`, err);
    }
  };

  useEffect(() => {
    if (img1Uploaded && img2Uploaded) {
      addPledge();
    }
  }, [img1Uploaded, img2Uploaded]);

  const [pledgeAddLoading, setPledgeAddLoading] = useState(false);

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
          Adding Pledge, please wait...
        </div>
      )}

      {!pledgeAddLoading && (
        <>
          <div className={"modelHead"}>
            <h2>Add A New Pledge</h2>
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
                rows={1}
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

          <div className={"proRow"}>
            <div className="delText">
              <label>Upload Certificate:</label>
              <input
                type={"file"}
                onChange={(e) =>
                  setPledgeData((curr) => {
                    return { ...curr, url: e.target.files[0] };
                  })
                }
              />
            </div>
            <div className="delText">
              <div className="delText">
                <label>Upload Preview:</label>
                <input
                  type={"file"}
                  onChange={(e) =>
                    setPledgeData((curr) => {
                      return {
                        ...curr,
                        previewURL: e.target.files[0],
                      };
                    })
                  }
                />
              </div>
            </div>
          </div>

          <CtaBtn Text={"Add"} fontSize={20} onClick={uploadImg} />
        </>
      )}
    </Modal>
  );
};

export default AddPledgeModel;
