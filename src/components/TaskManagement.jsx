import React, { useState } from "react";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });
  const [editTaskId, setEditTaskId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (editTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
    } else {
      const task = { ...newTask, id: Date.now() };
      setTasks([...tasks, task]);
    }
    setNewTask({ title: "", description: "", dueDate: "", status: "Pending" });
  };

  const editTask = (task) => {
    setNewTask(task);
    setEditTaskId(task.id);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-green-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Management</h1>

      <form
        onSubmit={saveTask}
        className="mb-8 p-6 bg-green-900 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editTaskId !== null ? "Edit Task" : "Create New Task"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-green-800 text-white placeholder-green-300"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-green-800 text-white placeholder-green-300"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-green-800 text-white"
            required
          />
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-green-800 text-white"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600 transition duration-300"
          >
            {editTaskId !== null ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-green-900 rounded-lg shadow-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-green-300">{task.description}</p>
              <p className="text-green-400">Due: {task.dueDate}</p>
              <p
                className={`text-sm font-semibold ${
                  task.status === "Completed"
                    ? "text-green-500"
                    : task.status === "In Progress"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Status: {task.status}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => editTask(task)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
