import { useState, useEffect } from "react";
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
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
      headers: {
        "api-key": "06c51887-b3df-4ca6-ab96-dc03fd98521e",
      },
    })
      .then((res) => res.json())
      .then((res) => setTasks(res.data));
  }, []);

  console.log(tasks);

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
      <button onClick={() => setSelectedTaskId(null)}>Сбросить выбор</button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              backgroundColor: arrColors[task.attributes.priority],
              border: selectedTaskId === task.id ? "5px solid blue" : "",
            }}
            onClick={() => {
              setSelectedTaskId(task.id);
              setSelectedTask(null);
              fetch(
                `https://trelly.it-incubator.app/api/1.0/boards/${task.attributes.boardId}/tasks/${task.id}`,
                //"https://trelly.it-incubator.app/api/1.0/boards/tasks" + task.id,
                // `https://trelly.it-incubator.app/api/1.0/boards/${task.attributes.
                //boardId}/tasks/${task.id}`
                // /boards/{boardId}/tasks/{taskId}
                {
                  headers: {
                    "api-key": "06c51887-b3df-4ca6-ab96-dc03fd98521e",
                  },
                }
              )
                .then((res) => res.json())
                .then((json) => {
                  setSelectedTask(json.data);
                });
            }}
          >
            <div
              style={{
                textDecorationLine:
                  task.attributes.status === 2 ? "line-through" : "none",
              }}
            >
              {task.attributes.title}
            </div>
            <label>
              Статус задачи{" "}
              <input
                type="checkbox"
                checked={task.attributes.status === 2 ? true : false}
              />
            </label>
            <p>
              Дата создания задачи:{" "}
              {new Date(task.attributes.addedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <div>
        <h3>Task details</h3>
        {selectedTask  === null ? (
          <p>Task is not selected</p>
        ) : (
          <div>
            <ul>
              <li>Задача: {selectedTask.attributes.title}</li>
              <li>Название доски: {selectedTask.attributes.boardTitle}</li>
              {selectedTask.attributes.description === null || "" ? (
                <li>Описание задачи отсутствует</li>
              ) : (
                <li>Описание задачи: {selectedTask.attributes.description}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
