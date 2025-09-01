import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import axios from "axios";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  let userId = sessionStorage.getItem("id");

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v2/getTasks/${userId}`
      );
      if (response.data.list) {
        setTasks(response.data.list);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  // Add / Update Task
  const addTask = async () => {
    if (!title.trim() || !body.trim()) return;
    if (title.length > 20) {
      alert("❌ Title must be 20 characters or less!");
      return;
    }

    try {
      if (editId) {
        // Update
        await axios.put(
          `http://localhost:1000/api/v2/updateTask/${editId}`,
          { title, body }
        );
        alert("✅ Task updated!");
        setEditId(null);
      } else {
        // Add
        await axios.post("http://localhost:1000/api/v2/addTask", {
          title,
          body,
          id: userId,
        });
      }
      setTitle("");
      setBody("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };

  // Edit Task
  const editTask = (task) => {
    setTitle(task.title);
    setBody(task.body);
    setEditId(task._id);
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:1000/api/v2/deleteTask/${taskId}/${userId}`
      );
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col items-center px-4 py-10">
      {/* Input Section */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 mb-10">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Todo App
        </h1>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            type="text"
            maxLength="20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title..."
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <textarea
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Body..."
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />
        </div>
        <button
          onClick={addTask}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          <Plus /> {editId ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Task List */}
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              editTask={editTask}
              deleteTask={() => deleteTask(task._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
