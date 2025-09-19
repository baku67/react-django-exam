import "./App.css";
import Header from "./components/Header";
import CategoryForm from "./components/CategoryForm";
import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterCategory from "./components/FilterCategory";

function App() {
  const [categoryList, setCategoryList] = useState([
    "Perso",
    "Travail",
    "Maison",
    "Loisirs",
  ]);
  const [taskList, setTaskList] = useState([]);

  // "" = toutes catégorys
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  function addCategory(newCategory) {
    setCategoryList((prev) => [...prev, newCategory]);
  }
  function addTask(newTask) {
    setTaskList((prev) => [...prev, newTask]);
  }

  function toggleTaskStatus(index) {
    setTaskList((prevList) => {
      const newList = prevList.slice();
      newList[index] = {
        ...newList[index],
        finished: !newList[index].finished,
      };
      return newList;
    });
  }

  function deleteTask(indexToDelete) {
    setTaskList((prev) => prev.filter((value, i) => i !== indexToDelete));
  }

  // Filtre des taches selon catégorie si une catégorie est séléctionnée;
  const filteredTasks = selectedCategoryFilter
    ? taskList.filter((t) => t.category === selectedCategoryFilter)
    : taskList;

  return (
    <>
      <Header title="Ma To-Do List par Catégories" />

      <main>
        <FilterCategory
          categories={categoryList}
          selected={selectedCategoryFilter}
          onChange={setSelectedCategoryFilter}
        />

        <div className="separator"></div>

        <CategoryForm addCategory={addCategory} />
        <TaskForm categories={categoryList} addTask={addTask} />

        <TaskList
          tasks={filteredTasks}
          onDeleteTask={deleteTask}
          toggleTaskStatus={toggleTaskStatus}
        />
      </main>
    </>
  );
}

export default App;
