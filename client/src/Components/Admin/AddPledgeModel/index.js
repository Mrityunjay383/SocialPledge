import React from "react";
import "./index.css";
import Modal from "react-modal";
import { AiFillCloseSquare } from "react-icons/ai";

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const AddPledgeModel = ({ modalIsOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={"modelHead"}>
        <h2>Add A New Pledge</h2>
        <AiFillCloseSquare
          className={"closeIcon"}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </Modal>
  );
};

export default AddPledgeModel;
