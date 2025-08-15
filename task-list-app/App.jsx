import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, toggleTask } from "./tasksSlice";

export default function App() {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <button
        onClick={() => {
          if (taskText.trim()) {
            dispatch(addTask(taskText));
            setTaskText("");
          }
        }}
      >
        Add Task
      </button>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
            <button onClick={() => dispatch(toggleTask(task.id))}>
              Toggle
            </button>
            <button onClick={() => dispatch(removeTask(task.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
