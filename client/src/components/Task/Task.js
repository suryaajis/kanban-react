import React, { useEffect, useState } from "react";
import { fetchListTodos, postTodos } from "../../api/server";
import "./Task.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal } from "../Modal/Modal";

export const Task = (props) => {
  const { group } = props;

  const [listTodos, setListTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState({
    name: "",
    progress: "",
  });

  useEffect(() => {
    fetchListTodos(group.item.id)
      .then((result) => setListTodos(result))
      .catch((err) => console.log(err));
  }, [group.item.id, refresh]);

  const handleSave = () => {
    const payload = {
      name: input.name,
      progress_percentage: input.progress,
    };

    postTodos(group.item.id, payload)
      .then((result) => setRefresh(!refresh))
      .catch((err) => console.log(err));

    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {listTodos.length > 0 ? (
        <>
          {listTodos.map((el) => {
            return (
              <div className="task-container" key={el.id}>
                <div>
                  <p className="task-text">{el.name}</p>
                  <hr className="divider" />
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div className={`progress-value`}></div>
                    </div>
                    <p className="progress-text">{el.progress_percentage}%</p>
                    <hr className="setting" />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="task-container">
          <p className="task-text">No Task</p>
        </div>
      )}

      <Modal show={showModal}>
        <div className="head">
          <h3>Create Task</h3>
        </div>
        <div className="body">
          <form>
            <label>
              <p>Task name</p>
              <input
                id="name"
                name="name"
                value={input.name}
                onChange={(event) =>
                  setInput({ ...input, name: event.target.value })
                }
              />
            </label>
            <label>
              <p>Progress</p>
              <input
                id="progress"
                name="progress"
                value={input.progress}
                onChange={(event) =>
                  setInput({ ...input, progress: event.target.value })
                }
              />
            </label>
          </form>
        </div>
        <div className="foot">
          <button className="modal-btn" onClick={handleClose}>
            Cancel
          </button>
          <button onClick={handleSave} className="modal-btn success-btn">
            Save Task
          </button>
        </div>
      </Modal>

      <div className="btn-task" onClick={() => setShowModal(!showModal)}>
        <IoMdAddCircleOutline />
        <p className="btn-text">New task</p>
      </div>
    </div>
  );
};
