const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

const readData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

exports.createProject = (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const data = readData();
    const newProject = {
      id: Date.now().toString(),
      name,
      description: description || '',
      owner: req.userId,
      members: [req.userId],
      createdAt: new Date(),
      status: 'active'
    };

    data.projects.push(newProject);
    writeData(data);

    res.status(201).json({
      message: 'Project created successfully',
      project: newProject
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectsByUser = (req, res) => {
  try {
    const data = readData();
    const userProjects = data.projects.filter(p => p.members.includes(req.userId));

    res.json({ projects: userProjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = (req, res) => {
  try {
    const { projectId } = req.params;
    const data = readData();
    const project = data.projects.find(p => p.id === projectId);

    if (!project || !project.members.includes(req.userId)) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, status } = req.body;
    const data = readData();
    const project = data.projects.find(p => p.id === projectId);

    if (!project || project.owner !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    if (name) project.name = name;
    if (description) project.description = description;
    if (status) project.status = status;

    writeData(data);
    res.json({ message: 'Project updated', project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = (req, res) => {
  try {
    const { projectId } = req.params;
    const data = readData();
    const projectIndex = data.projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1 || data.projects[projectIndex].owner !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    data.projects.splice(projectIndex, 1);
    data.tasks = data.tasks.filter(t => t.projectId !== projectId);
    writeData(data);

    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
