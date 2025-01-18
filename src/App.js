import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import EditTaskModal from './components/EditTaskModal';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: task.status === 'Incomplete' ? 'Completed' : 'Incomplete' }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filterTasks = () => {
    if (filter === 'All') return tasks;
    return tasks.filter((task) => task.status === filter);
  };

  return (
    <div className="App">
      <h1 className="app-title">Task Management</h1>
      <button className="add-task-btn" onClick={() => setIsAddModalOpen(true)}>
        Add Task
      </button>

      <div className="filters">
        {['All', 'Completed', 'Incomplete'].map((status) => (
          <div
            key={status}
            className={`filter-chip ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </div>
        ))}
      </div>

      <TaskList
        tasks={filterTasks()}
        onEdit={(task) => {
          setCurrentTask(task);
          setIsEditModalOpen(true);
        }}
        onDelete={deleteTask}
        onToggleStatus={toggleTaskStatus}
      />

      {isAddModalOpen && <AddTaskModal onClose={() => setIsAddModalOpen(false)} onAddTask={addTask} />}
      {isEditModalOpen && (
        <EditTaskModal
          task={currentTask}
          onClose={() => setIsEditModalOpen(false)}
          onEditTask={editTask}
        />
      )}
    </div>
  );
};

export default App;
