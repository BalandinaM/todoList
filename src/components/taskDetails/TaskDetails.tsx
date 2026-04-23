import { useState, useEffect } from "react";

export const TaskDetails = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const selectedTaskId = "4f310604-82b5-4afd-b9a4-ddf12dfac0a3";

  useEffect(() => {
    fetch(
      `https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${selectedTaskId}`,
      {
        headers: {
          "api-key": "ae08815d-4b7d-4dbb-b624-ec8beab5ced9",
        },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        setSelectedTask(json.data);
      });
  }, [boardId, selectedTaskId]);

  return (
    <div>
      <h3>Task details</h3>
      {selectedTask === null && selectedTaskId === null && (
        <p>Task is not selected</p>
      )}
      {!selectedTask && selectedTaskId && <p>Loading...</p>}
      {selectedTask && selectedTaskId && selectedTask.id !== selectedTaskId && (
        <p>Loading...</p>
      )}
      {selectedTask && selectedTask.id === selectedTaskId && (
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
  );
};
