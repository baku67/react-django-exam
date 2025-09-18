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

  function deleteTask(index) {
    setTaskList((prev) => prev.toSpliced(index, 1));
  }

  return (
    <>
      <Header title="Ma To-Do List par Catégories" />

      <main>
        <FilterCategory categories={categoryList} />

        <div className="separator"></div>

        <CategoryForm addCategory={addCategory} />
        <TaskForm categories={categoryList} addTask={addTask} />

        <TaskList
          tasks={taskList}
          onDeleteTask={deleteTask}
          toggleTaskStatus={toggleTaskStatus}
        />
      </main>
    </>
  );
}

export default App;
