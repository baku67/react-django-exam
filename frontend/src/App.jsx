import "./App.css";
import Header from "./components/Header";
import CategoryForm from "./components/CategoryForm";
import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterCategory from "./components/FilterCategory";
import Information from "./components/Information";
import {
  fetchCategories,
  fetchTasks,
  createCategory,
  createTask,
  updateTask,
  deleteTask,
} from "../api/api";

function App() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [globalError, setGlobalError] = useState("");

  async function loadInitialData(categoryId = "") {
    try {
      setGlobalError("");
      const [categoriesData, tasksData] = await Promise.all([
        fetchCategories(),
        fetchTasks(categoryId),
      ]);
      setCategories(categoriesData);
      setTasks(tasksData);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setGlobalError(
        "Impossible de charger les données depuis l'API (" +
          error.message +
          ")",
      );
    } finally {
      setLoadingInitialData(false);
    }
  }

  useEffect(() => {
    loadInitialData(selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  async function handleAddCategory(formData) {
    const newCategory = await createCategory(formData);
    setCategories((prev) =>
      [...prev, newCategory].sort((a, b) => a.name.localeCompare(b.name)),
    );
    return newCategory;
  }

  async function handleAddTask(formData) {
    const newTask = await createTask(formData);

    const shouldAppear =
      !selectedCategoryFilter ||
      Number(selectedCategoryFilter) === newTask.category_id;

    if (shouldAppear) {
      setTasks((prev) => [newTask, ...prev]);
    }
  }

  async function handleToggleTask(task) {
    const updatedTask = await updateTask(task.id, {
      is_completed: !task.is_completed,
    });

    setTasks((prev) =>
      prev.map((item) => (item.id === task.id ? updatedTask : item)),
    );
  }

  async function handleDeleteTask(taskId) {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  return (
    <>
      <Header title="Ma To-Do List par Catégories" />

      <main>
        <FilterCategory
          categories={categories}
          selected={selectedCategoryFilter}
          onChange={setSelectedCategoryFilter}
        />

        <div className="separator"></div>

        <CategoryForm onAddCategory={handleAddCategory} />
        <TaskForm categories={categories} onAddTask={handleAddTask} />

        {loadingInitialData && (
          <Information message="Chargement des données..." />
        )}
        {globalError && <Information message={globalError} type="warn" />}

        {!loadingInitialData && !globalError && (
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask}
          />
        )}
      </main>
    </>
  );
}

export default App;
