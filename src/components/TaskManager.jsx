import React, { useState } from "react";
import { Plus, Flag, Edit2, Trash2, Eye } from "lucide-react";
import Navbar from "./Navbar";
import Modal from "./Modal";
import { removeUserInfo } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const EmptyState = ({ onAddTask }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 bg-[#61677A]/10 rounded-lg p-8">
      <div className="text-white text-center mb-6">
        <h3 className="text-xl font-bold mb-2">No tasks yet!</h3>
        <p className="text-gray-300">
          Start organizing your work by adding your first task
        </p>
      </div>
      <button
        onClick={onAddTask}
        className="bg-white text-[#61677A] px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
      >
        <Plus size={20} />
        Add Your First Task
      </button>
    </div>
  );
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = {};
    if (!newTask.title.trim()) errors.title = "Title is required";
    if (!newTask.description.trim())
      errors.description = "Description is required";
    if (!newTask.dueDate) errors.dueDate = "Due date is required";
    return errors;
  };

  const addTask = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

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
    setValidationErrors({});
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(removeUserInfo());
    navigate("/signup");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setNewTask(task);
    setValidationErrors({});
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
    <div className="min-h-screen bg-[#272829]">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Playwrite+IN:wght@100..400&display=swap');
      </style>

      <Navbar onLogout={handleLogout} />

      <div className="flex flex-col gap-6 p-6 mt-24">
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowUpcoming(true)}
              className="md:hidden bg-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Flag size={20} />
              Show Upcoming
            </button>
            <button
              onClick={() => {
                setEditingTask(null);
                setNewTask({
                  title: "",
                  description: "",
                  dueDate: "",
                  status: "pending",
                });
                setValidationErrors({});
                setIsModalOpen(true);
              }}
              className="bg-white text-[#61677A] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>

          {tasks.length === 0 ? (
            <EmptyState
              onAddTask={() => {
                setEditingTask(null);
                setNewTask({
                  title: "",
                  description: "",
                  dueDate: "",
                  status: "pending",
                });
                setValidationErrors({});
                setIsModalOpen(true);
              }}
            />
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#61677A] p-4 rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl text-white font-semibold mb-2">
                        {task.title}
                      </h3>
                      <p className="text-gray-200 text-sm mb-2">
                        {task.description}
                      </p>
                      <div className="text-sm text-gray-200">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <span className="inline-block px-3 py-1 text-lg rounded bg-white text-[#61677A]">
                        {task.status}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewingTask(task)}
                          className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors duration-200"
                        >
                          <Eye size={16} className="text-white" />
                        </button>
                        <button
                          onClick={() => startEdit(task)}
                          className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors duration-200"
                        >
                          <Edit2 size={16} className="text-white" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors duration-200"
                        >
                          <Trash2 size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:block w-full md:w-4/13 fixed right-6 top-30 bottom-6 overflow-auto">
          <div className="bg-[#61677A] p-4 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Flag size={20} />
              Upcoming Tasks
            </h2>
            <div className="space-y-4">
              {getUpcomingTasks().length === 0 ? (
                <p className="text-gray-300 text-center py-4">
                  No upcoming tasks
                </p>
              ) : (
                getUpcomingTasks().map((task) => (
                  <div key={task.id} className="bg-white/10 p-3 rounded">
                    <h4 className="text-white font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-200 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <Modal
          isOpen={showUpcoming}
          onClose={() => setShowUpcoming(false)}
          title="Upcoming Tasks"
        >
          <div className="space-y-4">
            {getUpcomingTasks().length === 0 ? (
              <p className="text-gray-300 text-center py-4">
                No upcoming tasks
              </p>
            ) : (
              getUpcomingTasks().map((task) => (
                <div key={task.id} className="bg-white/10 p-3 rounded">
                  <h4 className="text-white font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-200 mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </Modal>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setValidationErrors({});
          }}
          title={editingTask ? "Edit Task" : "Add New Task"}
        >
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full p-2 rounded bg-white text-[#61677A] placeholder-gray-500"
              />
              {validationErrors.title && (
                <p className="text-red-300 text-sm mt-1">
                  {validationErrors.title}
                </p>
              )}
            </div>

            <div>
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full p-2 rounded bg-white text-[#61677A] placeholder-gray-500"
                rows="4"
              />
              {validationErrors.description && (
                <p className="text-red-300 text-sm mt-1">
                  {validationErrors.description}
                </p>
              )}
            </div>

            <div>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
                className="w-full p-2 rounded bg-white text-[#61677A]"
              />
              {validationErrors.dueDate && (
                <p className="text-red-300 text-sm mt-1">
                  {validationErrors.dueDate}
                </p>
              )}
            </div>

            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="w-full p-2 rounded bg-white text-[#61677A]"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setValidationErrors({});
                }}
                className="px-4 py-2 rounded bg-white text-[#61677A] hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 rounded bg-white text-[#61677A] hover:bg-gray-100 transition-colors duration-200"
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
              <h3 className="text-2xl font-bold">{viewingTask.title}</h3>
              <p className="text-gray-200">{viewingTask.description}</p>
              <div className="text-sm text-gray-200">
                Due: {new Date(viewingTask.dueDate).toLocaleDateString()}
              </div>
              <div className="inline-block px-3 py-1 text-lg rounded bg-white text-[#61677A]">
                {viewingTask.status}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default TaskManager;
