import React from "react";
import "./Dropdown.css";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { BiEditAlt } from "react-icons/bi";

export const Dropdown = ({ open, handleEditModal, item }) => {
  return (
    <div className="dropdown">
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <IoMdArrowRoundForward />
            <p>Menu Right</p>
          </li>
          <li className="menu-item">
            <IoMdArrowRoundBack />
            <p>Menu Left</p>
          </li>
          <li className="menu-item" onClick={() => handleEditModal(item)}>
            <BiEditAlt size={20} />
            <p>Edit</p>
          </li>
          <li className="menu-item menu-delete">
            <FiTrash2 />
            <p>Delete</p>
          </li>
        </ul>
      ) : null}
    </div>
  );
};
