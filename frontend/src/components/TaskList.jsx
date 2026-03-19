import Button from "./Button";
import React from "react";

function TaskList(props) {
  function handleDeleteTask(event, index) {
    event.stopPropagation(); // Pour éviter de toggle en meme temps
    props.onDeleteTask(index);
  }

  function toggleTaskStatus(index) {
    console.log("toggle", index);
    props.toggleTaskStatus(index);
  }

  return (
    <>
      <h2 style={{ marginBottom: "0" }}>Liste des tâches:</h2>
      <ul>
        {props.tasks.length > 0 &&
          props.tasks.map((task, index) => (
            <React.Fragment key={index}>
              <li
                className="task-elem"
                style={
                  task.finished
                    ? { textDecoration: "line-through", opacity: "0.5" }
                    : {}
                }
              >
                <input
                  name="finished"
                  type="checkbox"
                  checked={task.finished}
                  onClick={() => toggleTaskStatus(index)}
                />
                <span>{task.name}</span>
                <span>({task.category})</span>
                <Button
                  label="supprimer"
                  color="#dd5c4b"
                  htmlType="button"
                  onClick={(event) => handleDeleteTask(event, index)}
                />
              </li>
              {task.finished && <div className="task-finished-line"></div>}
            </React.Fragment>
          ))}
        {props.tasks.length === 0 && <p>Aucune tâche à afficher</p>}
      </ul>
    </>
  );
}

export default TaskList;
