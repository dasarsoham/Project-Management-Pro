import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectAPI, taskAPI } from '../api/api';
import { Navbar } from '../components/Navbar';
import '../styles/project-detail.css';

export const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const projectResponse = await projectAPI.getProjectById(projectId);
      setProject(projectResponse.data.project);

      const tasksResponse = await taskAPI.getTasksByProject(projectId);
      setTasks(tasksResponse.data.tasks || []);
    } catch (error) {
      console.error('Failed to fetch project data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.createTask({
        projectId,
        title: taskTitle,
        description: taskDesc,
        priority: taskPriority,
      });
      setTaskTitle('');
      setTaskDesc('');
      setTaskPriority('medium');
      setShowTaskForm(false);
      fetchProjectData();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskAPI.updateTask(taskId, { status: newStatus });
      fetchProjectData();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        fetchProjectData();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  if (loading || !project) {
    return (
      <>
        <Navbar />
        <div className="loading"><div className="spinner"></div></div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="project-detail-container">
        <div className="project-header">
          <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>
          <span className={`badge badge-${project.status === 'active' ? 'green' : 'yellow'}`}>
            {project.status}
          </span>
        </div>

        <div className="task-stats">
          <div className="task-stat">
            <span className="stat-value">{tasks.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="task-stat">
            <span className="stat-value">{tasks.filter(t => t.status === 'done').length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="task-stat">
            <span className="stat-value">{tasks.filter(t => t.status === 'in-progress').length}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="task-stat">
            <span className="stat-value">{tasks.filter(t => t.status === 'to-do').length}</span>
            <span className="stat-label">To Do</span>
          </div>
        </div>

        <div className="tasks-section">
          <div className="section-header">
            <h2>Tasks</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setShowTaskForm(!showTaskForm)}>
              {showTaskForm ? '✕ Cancel' : '+ New Task'}
            </button>
          </div>

          {showTaskForm && (
            <div className="create-form card">
              <form onSubmit={handleCreateTask}>
                <div className="input-group">
                  <label>Task Title</label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                    rows="3"
                  />
                </div>
                <div className="input-group">
                  <label>Priority</label>
                  <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Task</button>
              </form>
            </div>
          )}

          <div className="tasks-container">
            {tasks.length > 0 ? (
              <div className="tasks-by-status">
                {['to-do', 'in-progress', 'done'].map(status => (
                  <div key={status} className="status-column">
                    <h4 className="status-title">{getStatusLabel(status)}</h4>
                    <div className="tasks-column">
                      {tasks.filter(t => t.status === status).map(task => (
                        <div key={task.id} className="task-card">
                          <div className="task-header">
                            <h5>{task.title}</h5>
                            <button
                              className="btn-delete"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              ✕
                            </button>
                          </div>
                          {task.description && <p className="task-description">{task.description}</p>}
                          <div className="task-footer">
                            <span className={`badge badge-${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <select
                              value={task.status}
                              onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                              className="status-select"
                            >
                              <option value="to-do">To Do</option>
                              <option value="in-progress">In Progress</option>
                              <option value="done">Done</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No tasks yet. Create one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const getStatusLabel = (status) => {
  const labels = { 'to-do': '📋 To Do', 'in-progress': '⏳ In Progress', 'done': '✅ Done' };
  return labels[status] || status;
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'red';
    case 'medium': return 'yellow';
    case 'low': return 'blue';
    default: return 'gray';
  }
};
