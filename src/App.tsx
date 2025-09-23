import { useState } from "react";
import "./App.css";

const tasks = [
  {
    id: 1,
    title: "Купить продукты на неделю",
    isDone: false,
    addedAt: "1 сентября",
    priority: 2,
  },
  {
    id: 2,
    title: "Полить цветы",
    isDone: true,
    addedAt: "2 сентября",
    priority: 0,
  },
  {
    id: 3,
    title: "Сходить на тренировку",
    isDone: false,
    addedAt: "3 сентября",
    priority: 1,
  },
   {
    id: 4,
    title: "Полить цветы",
    isDone: false,
    addedAt: "3 сентября",
    priority: 4,
  },
];

//массив цветов для обозначения приоритетности задачи
const arrColors = ["#ffffff", "#ffd7b5", "#ffb38a", "#ff9248", "#ff6700"];


function App() {
  const [selectedTask, setSelectedTask] = useState(null)

  const handleSelectTask = (id) => {
    alert(`Выбрана задача с id: ${id}`);
    setSelectedTask(id)
  } 

  if (tasks === null) {
    return (
      <>
        <h1>Список дел</h1>
        <p>Загрузка...</p>
      </>
    );
  }

  if (tasks.length === 0) {
    return (
      <>
        <h1>Список дел</h1>
        <p>Тут пока пусто...</p>
      </>
    );
  }

  return (
    <>
      <h1>Список дел</h1>
      <button onClick={() => handleSelectTask(null)}>Сбросить выбор</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style = {{backgroundColor: arrColors[task.priority], border: selectedTask === task.id ? '5px solid blue' : '' }} onClick={() => handleSelectTask(task.id)}>
            <div style={{textDecorationLine: task.isDone ? "line-through" : "none"}}>{task.title}</div>
            <label>
              Статус задачи <input type="checkbox" checked={task.isDone} />
            </label>
            <p>Дата создания задачи: {task.addedAt}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
