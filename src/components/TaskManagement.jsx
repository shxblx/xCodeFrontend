import React, { useState } from "react";
import { Plus, Flag, Edit2, Trash2, Eye, X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#61677A] text-white rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const addTask = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...newTask, id: task.id } : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    }
    setNewTask({ title: "", description: "", dueDate: "", status: "pending" });
    setIsModalOpen(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setNewTask(task);
    setIsModalOpen(true);
  };

  const getUpcomingTasks = () => {
    return tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-[#272829]">
      <div className="w-full md:w-2/3">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Task Manager</h1>
          <button
            onClick={() => {
              setEditingTask(null);
              setNewTask({
                title: "",
                description: "",
                dueDate: "",
                status: "pending",
              });
              setIsModalOpen(true);
            }}
            className="bg-[#61677A] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-[#61677A] p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">{task.title}</h3>
                  <p className="text-gray-200 text-sm mt-1">
                    {task.description}
                  </p>
                  <div className="mt-2 text-sm text-gray-200">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-white text-[#61677A]">
                    {task.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewingTask(task)}
                    className="p-2 rounded bg-white/10 hover:bg-white/20"
                  >
                    <Eye size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => startEdit(task)}
                    className="p-2 rounded bg-white/10 hover:bg-white/20"
                  >
                    <Edit2 size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded bg-white/10 hover:bg-white/20"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <div className="bg-[#61677A] p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Flag size={20} />
            Upcoming Tasks
          </h2>
          <div className="space-y-4">
            {getUpcomingTasks().map((task) => (
              <div key={task.id} className="bg-white/10 p-3 rounded">
                <h4 className="text-white font-medium">{task.title}</h4>
                <p className="text-sm text-gray-200 mt-1">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 rounded bg-[#61677A] text-white placeholder-gray-300"
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-2 rounded bg-[#61677A] text-white placeholder-gray-300"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            className="w-full p-2 rounded bg-[#61677A] text-white"
          />
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className="w-full p-2 rounded bg-[#61677A] text-white"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded bg-gray-600 text-white hover:opacity-90"
            >
              Cancel
            </button>
            <button
              onClick={addTask}
              className="px-4 py-2 rounded bg-[#61677A] text-white hover:opacity-90"
            >
              {editingTask ? "Update" : "Add"} Task
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!viewingTask}
        onClose={() => setViewingTask(null)}
        title="Task Details"
      >
        {viewingTask && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{viewingTask.title}</h3>
            <p className="text-gray-200">{viewingTask.description}</p>
            <div className="text-sm text-gray-200">
              Due: {new Date(viewingTask.dueDate).toLocaleDateString()}
            </div>
            <div className="inline-block px-2 py-1 rounded bg-[#61677A] text-white">
              {viewingTask.status}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TaskManager;
