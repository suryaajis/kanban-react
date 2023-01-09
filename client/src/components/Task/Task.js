import React, { useEffect, useState } from "react";
import {
  deleteTodo,
  editTodo,
  fetchListTodos,
  postTodo,
} from "../../api/server";
import "./Task.css";
import { IoMdAddCircleOutline, IoMdCheckmarkCircle } from "react-icons/io";
import { Modal } from "../Modal/Modal";
import { Dropdown } from "../Dropdown/Dropdown";

export const Task = (props) => {
  const { group } = props;

  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [listTodos, setListTodos] = useState([]);
  const [modalStatus, setModalStatus] = useState("Create");
  const [todoItem, setTodoItem] = useState({
    id: null,
  });
  const [input, setInput] = useState({
    id: null,
    name: "",
    progress: "",
  });

  useEffect(() => {
    fetchListTodos(group.item.id)
      .then((result) => setListTodos(result))
      .catch((err) => console.log(err));
  }, [group.item.id, refresh]);

  const handleClose = () => {
    clearPayload();
  };

  const clearPayload = () => {
    setInput({
      id: null,
      name: "",
      progress: "",
    });
    setShowModal(false);
    setShowModalDelete(false);
  };

  const handleDropdown = (item) => {
    setTodoItem(item);
    setOpenDropdown(!openDropdown);
  };

  const handleEditModal = (item) => {
    clearPayload();
    setOpenDropdown(!openDropdown);
    setModalStatus("Edit");
    setShowModal(true);
    setInput({
      id: item.id,
      name: item.name,
      progress: item.progress_percentage,
    });
  };

  const handleDeleteModal = (item) => {
    clearPayload();
    setOpenDropdown(!openDropdown);
    setShowModalDelete(true);
    setInput({
      id: item.id,
      name: item.name,
      progress: item.progress_percentage,
    });
  };

  const handleSave = () => {
    const payload = {
      name: input.name,
      progress_percentage: input.progress,
    };

    postTodo(group.item.id, payload)
      .then((result) => setRefresh(!refresh))
      .catch((err) => console.log(err));

    setShowModal(false);
  };

  const handleChange = () => {
    const payload = {
      name: input.name,
      target_todo_id: todoItem.todo_id,
    };

    editTodo(group.item.id, input.id, payload)
      .then((result) => setRefresh(!refresh))
      .catch((err) => console.log(err));

    setShowModal(false);
  };

  const handleRemove = () => {
    deleteTodo(group.item.id, input.id)
      .then((result) => setRefresh(!refresh))
      .catch((err) => console.log(err));

    setShowModalDelete(false);
  };

  return (
    <div>
      {listTodos.length > 0 ? (
        <>
          {listTodos.map((el, index) => {
            return (
              <div className="task-container" key={el.id}>
                <div>
                  <p className="task-text">{el.name}</p>
                  <hr className="divider" />
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        style={{
                          height: "16px",
                          width: `${el.progress_percentage}%`,
                          backgroundColor:
                            el.progress_percentage === 100
                              ? "#43936C"
                              : "#01959F",
                          borderRadius:
                            el.progress_percentage === 100
                              ? "12px"
                              : "12px 0 0 12px",
                        }}
                      ></div>
                    </div>
                    <p className="progress-text">
                      {el.progress_percentage === 100 ? (
                        <IoMdCheckmarkCircle size={16} color={"#43936C"} />
                      ) : (
                        `${el.progress_percentage}%`
                      )}
                    </p>
                    {todoItem.id === el.id ? (
                      <Dropdown
                        open={openDropdown}
                        handleEditModal={handleEditModal}
                        handleDeleteModal={handleDeleteModal}
                        item={el}
                        group={group}
                      />
                    ) : (
                      <></>
                    )}

                    <hr
                      className="setting"
                      onClick={() => handleDropdown(el)}
                    />
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
          <h3>{modalStatus} Task</h3>
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
                disabled={modalStatus === "Edit"}
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
          <button
            onClick={modalStatus === "Create" ? handleSave : handleChange}
            className="modal-btn success-btn"
          >
            Save {modalStatus === "Create" ? "Task" : "Change"}
          </button>
        </div>
      </Modal>

      <Modal show={showModalDelete}>
        <div className="head">
          <h3>Delete Task</h3>
        </div>

        <div className="body">
          <p>
            Are you want to delete this task? your action can't be reverted.
          </p>
        </div>

        <div className="foot">
          <button className="modal-btn" onClick={handleClose}>
            Cancel
          </button>
          <button onClick={handleRemove} className="modal-btn delete-btn">
            Delete
          </button>
        </div>
      </Modal>

      <div
        className="btn-task"
        onClick={() => {
          clearPayload();
          setShowModal(true);
        }}
      >
        <IoMdAddCircleOutline />
        <p className="btn-text">New task</p>
      </div>
    </div>
  );
};
