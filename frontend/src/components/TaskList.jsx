import Button from "./Button";

function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <>
      <h2 style={{ marginBottom: "0" }}>Liste des tâches :</h2>

      {tasks.length === 0 && <p>Aucune tâche à afficher</p>}

      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="task-elem"
              style={
                task.is_completed
                  ? { textDecoration: "line-through", opacity: "0.5" }
                  : {}
              }
            >
              <input
                name={`finished-${task.id}`}
                type="checkbox"
                checked={task.is_completed}
                onChange={() => onToggleTask(task)}
              />

              <span>{task.description}</span>
              <span>({task.category_name})</span>

              <Button
                label="Supprimer"
                color="#dd5c4b"
                htmlType="button"
                onClick={() => onDeleteTask(task.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default TaskList;
