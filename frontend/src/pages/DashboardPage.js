import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI, taskAPI } from '../api/api';
import { Navbar } from '../components/Navbar';
import '../styles/dashboard.css';

export const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await projectAPI.getProjects();
        setProjects(projectsResponse.data.projects || []);

        // Fetch tasks for all projects  
        let allTasks = [];
        for (const project of projectsResponse.data.projects || []) {
          const tasksResponse = await taskAPI.getTasksByProject(project.id);
          allTasks = [...allTasks, ...(tasksResponse.data.tasks || [])];
        }
        setTasks(allTasks);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const activeTasks = tasks.filter(t => t.status !== 'done').length;

  if (loading) {
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
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's an overview of your projects and tasks.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div>
              <p className="stat-label">Total Projects</p>
              <h3>{projects.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div>
              <p className="stat-label">Completed Tasks</p>
              <h3>{completedTasks}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div>
              <p className="stat-label">Active Tasks</p>
              <h3>{activeTasks}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div>
              <p className="stat-label">Completion Rate</p>
              <h3>{tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0}%</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="section">
            <div className="section-header">
              <h2>Recent Projects</h2>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/projects/new')}>
                + New Project
              </button>
            </div>
            {projects.length > 0 ? (
              <div className="projects-list">
                {projects.slice(0, 3).map(project => (
                  <div
                    key={project.id}
                    className="project-item"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <div>
                      <h4>{project.name}</h4>
                      <p className="project-desc">{project.description || 'No description'}</p>
                    </div>
                    <span className={`badge badge-${project.status === 'active' ? 'green' : 'yellow'}`}>
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No projects yet. Create one to get started!</p>
            )}
          </div>

          <div className="section">
            <h2>Recent Tasks</h2>
            {tasks.length > 0 ? (
              <div className="tasks-list">
                {tasks.slice(0, 5).map(task => (
                  <div key={task.id} className="task-item">
                    <div className="task-info">
                      <h5>{task.title}</h5>
                      <p className="task-project">
                        Project • {projects.find(p => p.id === task.projectId)?.name}
                      </p>
                    </div>
                    <div className="task-meta">
                      <span className={`badge badge-${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`badge badge-${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No tasks yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'red';
    case 'medium': return 'yellow';
    case 'low': return 'blue';
    default: return 'gray';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'done': return 'green';
    case 'in-progress': return 'yellow';
    case 'to-do': return 'blue';
    default: return 'gray';
  }
};
