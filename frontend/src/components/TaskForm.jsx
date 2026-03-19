import { useState } from "react";
import Button from "./Button";
import Information from "./Information";

function TaskForm(props) {
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState(props.categories[0]); // par défaut "Perso"
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmitForm(event) {
    event.preventDefault();

    // Validation input (au moins 5 char)
    if (taskName.trim().length < 5) {
      setErrorMsg("Le nom de la tâche doit faire au moins 5 caractères.");
    } else {
      setErrorMsg("");
      const newTask = {
        name: taskName.trim(),
        category: taskCategory,
        finished: false,
      };
      props.addTask(newTask);
      setTaskName(""); // on reinitialise le nom de la tâche mais pas la catégorie
    }
  }

  return (
    <>
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
        <Button label="Ajouter" htmlType="submit" color="#388d38" />
      </form>
      {errorMsg && <Information message={errorMsg} type="warn" />}
    </>
  );
}

export default TaskForm;
