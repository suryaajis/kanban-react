import React from "react";
import "./Task.css";

export const Task = (props) => {
  const { item } = props;
  if (item) {
    return (
      <div className="task-container">
        {/* <p className='task-text'>No Task</p> */}
        <div>
          <p className="task-text">{item}</p>
          <hr className="divider" />
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-value"></div>
            </div>
            <p className="progress-text">32%</p>
            <hr className="setting" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="task-container">
        <p className="task-text">No Task</p>
      </div>
    );
  }
};
