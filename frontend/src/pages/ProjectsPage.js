import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI } from '../api/api';
import { Navbar } from '../components/Navbar';
import '../styles/projects.css';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getProjects();
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await projectAPI.createProject({ name: projectName, description: projectDesc });
      setProjectName('');
      setProjectDesc('');
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.deleteProject(projectId);
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

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
      <div className="projects-container">
        <div className="projects-header">
          <h1>Projects</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ New Project'}
          </button>
        </div>

        {showForm && (
          <div className="create-form card">
            <h3>Create New Project</h3>
            <form onSubmit={handleCreateProject}>
              <div className="input-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                  placeholder="Enter project name"
                />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Project description (optional)"
                  rows="4"
                />
              </div>
              <button type="submit" className="btn btn-primary">Create Project</button>
            </form>
          </div>
        )}

        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id} className="project-card card">
                <div className="project-card-header">
                  <h3>{project.name}</h3>
                  <span className={`badge badge-${project.status === 'active' ? 'green' : 'yellow'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="project-card-desc">{project.description || 'No description'}</p>
                <div className="project-card-meta">
                  <small>Created on {new Date(project.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="project-card-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View →
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state" style={{ gridColumn: '1/-1' }}>
              <p>No projects yet. Create one to get started!</p>
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Create Your First Project
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
