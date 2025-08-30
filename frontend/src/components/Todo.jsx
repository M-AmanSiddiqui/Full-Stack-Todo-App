import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [expanded, setExpanded] = useState({}); // for read more/less

  // Add or Update Task
  const addTask = () => {
    if (!title.trim() || !body.trim()) return;

    if (title.length > 20) {
      alert("❌ Title must be 20 characters or less!");
      return;
    }

    if (editId) {
      setTasks(
        tasks.map((task) =>
          task.id === editId ? { ...task, title, body } : task
        )
      );
      alert("Task updated! ✅");
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        body,
      };
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setBody("");
  };

  // Edit Task
  const editTask = (task) => {
    setTitle(task.title);
    setBody(task.body);
    setEditId(task.id);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Read More/Read Less
  const toggleRead = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col items-center px-4 py-10">
      {/* Input Section */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 mb-10">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          🛒 VIP Todo App
        </h1>

        {/* Input Fields */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            type="text"
            maxLength="20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title (max 20 chars)..."
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <textarea
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Body (no limit)..."
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

      {/* Task Container */}
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Your Tasks 📋
        </h2>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks yet. Add one 🚀</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => {
              const isExpanded = expanded[task.id];
              const bodyText = isExpanded
                ? task.body
                : task.body.slice(0, 100); // pehle 100 chars show karo

              return (
                <div
                  key={task.id}
                  className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-md p-5 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 mt-2 whitespace-pre-line">
                      {bodyText}
                      {task.body.length > 100 && (
                        <button
                          onClick={() => toggleRead(task.id)}
                          className="ml-2 text-indigo-600 font-semibold hover:underline"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => editTask(task)}
                      className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
