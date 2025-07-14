import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../redux/taskSlice';

const TaskManager = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector(state => state.tasks);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(addTask({ title: newTask }));
      setNewTask('');
    }
  };

  const handleUpdateTask = (task) => {
    dispatch(updateTask(task));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Task Manager</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editingTask === task.id ? (
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleUpdateTask({ ...task, title: e.target.value })}
                onBlur={() => setEditingTask(null)}
                autoFocus
              />
            ) : (
              <>
                <span onDoubleClick={() => setEditingTask(task.id)}>{task.title}</span>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;