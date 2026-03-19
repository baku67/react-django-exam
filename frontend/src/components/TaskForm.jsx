import { useEffect, useState } from "react";
import Button from "./Button";
import Information from "./Information";

function TaskForm({ categories, onAddTask }) {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCategoryId, setTaskCategoryId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categories.length > 0 && !taskCategoryId) {
      setTaskCategoryId(String(categories[0].id));
    }
  }, [categories, taskCategoryId]);

  async function handleSubmitForm(event) {
    event.preventDefault();
    setErrorMsg("");

    if (taskDescription.trim().length < 3) {
      setErrorMsg("La tâche doit faire au moins 3 caractères");
      return;
    }

    if (!taskCategoryId) {
      setErrorMsg("Sélectionnez d'abord une catégorie");
      return;
    }

    try {
      setLoading(true);

      await onAddTask({
        description: taskDescription.trim(),
        category_id: Number(taskCategoryId),
      });

      setTaskDescription("");
    } catch (error) {
      if (error.status === 400 && error.data) {
        if (error.data.description) {
          setErrorMsg(error.data.description[0]);
        } else if (error.data.category_id) {
          setErrorMsg(error.data.category_id[0]);
        } else {
          setErrorMsg("Données invalides");
        }
      } else {
        setErrorMsg("Impossible d'ajouter la tâche");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={taskDescription}
          onChange={(event) => setTaskDescription(event.target.value)}
          placeholder="Nouvelle tâche"
        />

        <select
          value={taskCategoryId}
          onChange={(event) => setTaskCategoryId(event.target.value)}
        >
          {categories.length === 0 && (
            <option value="">Aucune catégorie disponible</option>
          )}

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <Button
          label={loading ? "Ajout..." : "Ajouter"}
          htmlType="submit"
          color="#388d38"
        />
      </form>

      {errorMsg && <Information message={errorMsg} type="warn" />}
    </>
  );
}

export default TaskForm;
