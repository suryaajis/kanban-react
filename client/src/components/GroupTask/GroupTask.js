import React, { useState } from "react";
import "./GroupTask.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal } from "../Modal/Modal";

export const GroupTask = (props) => {
  const { id, months } = props.section;

  const [showModal, setShowModal] = useState(false);

  const addTask = (event) => {
    event.preventDefault();
    console.log("add task");
  };

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className={`group-container ${"task-" + id}`}>
      <div className={`badge ${"task-" + id}`}>
        <p className="badge-text">Group Task {id}</p>
      </div>
      <p className="month">{months}</p>
      {props.children}

      <Modal show={showModal}>
        <div className="head">
          <h3>Create Task</h3>
        </div>
        <div className="body">
          <form onSubmit={addTask}>
            <label>
              <p>Task name</p>
              <input id="name" name="name" />
            </label>
            <label>
              <p>Progress</p>
              <input id="progress" name="progress" />
            </label>
          </form>
        </div>
        <div className="foot">
          <button className="modal-btn" onClick={handleClose}>Cancel</button>
          <button className="modal-btn success-btn">Save Task</button>
        </div>
      </Modal>

      <div className="btn-task" onClick={() => setShowModal(!showModal)}>
        <IoMdAddCircleOutline />
        <p className="btn-text">New task</p>
      </div>
    </div>
  );
};
