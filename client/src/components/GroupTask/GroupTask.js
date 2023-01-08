import React from "react";
import "./GroupTask.css";

export const GroupTask = (props) => {
  const { id, months } = props.section;

  return (
    <div className={`group-container ${"task-" + id}`}>
      <div className={`badge ${"task-" + id}`}>
        <p className="badge-text">Group Task {id}</p>
      </div>
      <p className="month">{months}</p>

      {props.children}
      <div>
        <div></div>
        <p>New task</p>
      </div>
    </div>
  );
};
