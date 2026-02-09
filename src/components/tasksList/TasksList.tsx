import { useState, useEffect } from "react";
//import "./App.css";

const tasksMock = [
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

export const TasksList = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(tasksMock);
  const [boardId, setBoardId] = useState(null);

  // useEffect(() => {
  //   fetch("https://trelly.it-incubator.app/api", {
  //     headers: {
  //       "api-key": "ae08815d-4b7d-4dbb-b624-ec8beab5ced9",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => setTasks(res.data));
  // }, []);

  const handleResetSelect = () => {
    setSelectedTaskId(null);
    setSelectedTask(null);
  };

  return (
    <div className="wrap_list">
          <button onClick={() => handleResetSelect()}>Сбросить выбор</button>
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
                  setBoardId(task.attributes.boardId);
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
        </div>
  )
}