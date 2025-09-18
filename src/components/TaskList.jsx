function TaskList(props) {
  return (
    <ul>
      {props.tasks.map((task, index) => (
        <li key={index}>
          <span>{task.name}</span>
          <span>{task.category}</span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
