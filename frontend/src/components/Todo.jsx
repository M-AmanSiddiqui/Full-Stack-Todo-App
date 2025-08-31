import React, { useState } from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  

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
 

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col items-center px-4 py-10">
      {/* Input Section */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 mb-10">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
           Todo App
        </h1>

        {/* Input Fields */}
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

      {/* Task Container */}
      <div className="w-full max-w-5xl rounded-2xl shadow-2xl p-8">
        

    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">  
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
               
                editTask={editTask}
                deleteTask={deleteTask}
              />
            ))}
          </div>
       
      </div>
    </div>
  );
}
