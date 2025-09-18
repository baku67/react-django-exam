import Button from "./Button";
import React from "react";

function TaskList(props) {
  function handleDeleteTask(index) {
    props.onDeleteTask(index);
  }

  function toggleTaskStatus(index) {
    console.log("toggle", index);
    props.toggleTaskStatus(index);
  }

  return (
    <ul>
      {props.tasks.length > 0 &&
        props.tasks.map((task, index) => (
          <React.Fragment key={index}>
            <li
              onClick={() => toggleTaskStatus(index)}
              className="task-elem"
              style={
                task.finished
                  ? { textDecoration: "line-through", opacity: "0.5" }
                  : {}
              }
            >
              <span>{task.name}</span>
              <span>({task.category})</span>
              <Button
                label="supprimer"
                color="#dd5c4b"
                htmlType="button"
                onClick={() => handleDeleteTask(index)}
              />
            </li>
            {task.finished && <div class="task-finished-line"></div>}
          </React.Fragment>
        ))}
      {props.tasks.length === 0 && <p>Aucune tâche à afficher</p>}
    </ul>
  );
}

export default TaskList;
