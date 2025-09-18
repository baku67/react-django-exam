import "./App.css";
import Header from "./components/Header";
import CategoryForm from "./components/CategoryForm";
import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [categoryList, setCategoryList] = useState([
    "Perso",
    "Travail",
    "Maison",
    "Loisirs",
  ]);
  const [taskList, setTaskList] = useState([]);

  function addCategory(newCategory) {
    setCategoryList((prev) => [...prev, newCategory]);
  }
  function addTask(newTask) {
    setTaskList((prev) => [...prev, newTask]);
  }

  return (
    <>
      <Header title="Ma To-Do List par Catégories" />

      <main>
        <CategoryForm addCategory={addCategory} />
        <TaskForm categories={categoryList} addTask={addTask} />

        <TaskList tasks={taskList} />
      </main>
    </>
  );
}

export default App;
