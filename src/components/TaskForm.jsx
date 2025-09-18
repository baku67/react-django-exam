import { useState } from "react";
import Button from "./Button";

function TaskForm(props) {
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState(props.categories[0]); // par défaut "Perso"

  function handleSubmitForm(event) {
    event.preventDefault();
    const newTask = {
      name: taskName.trim(),
      category: taskCategory,
    };
    props.addTask(newTask);
    setTaskName(""); // on reinitialise le nom de la tâche mais pas la catégorie
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Nouvelle tâche"
      />
      <select
        value={taskCategory}
        onChange={(event) => setTaskCategory(event.target.value)}
      >
        {props.categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <Button type="" htmlType="submit" />
    </form>
  );
}

export default TaskForm;
