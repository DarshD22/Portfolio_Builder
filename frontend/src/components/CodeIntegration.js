import React, { useState } from 'react';

const CodeIntegration = ({ projects, onUpdate }) => {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    codeSnippet: ''
  });

  const [editingIndex, setEditingIndex] = useState(-1);

  const handleAddProject = () => {
    const technologies = newProject.technologies
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== '');

    if (editingIndex >= 0) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = { ...newProject, technologies };
      onUpdate(updatedProjects);
      setEditingIndex(-1);
    } else {
      onUpdate([...projects, { ...newProject, technologies }]);
    }

    setNewProject({
      title: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      codeSnippet: ''
    });
  };

  const handleEditProject = (index) => {
    const project = projects[index];
    setNewProject({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setEditingIndex(index);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    onUpdate(updatedProjects);
  };

  const handleGithubImport = async () => {
    if (!newProject.githubUrl) return;

    try {
      // Extract username and repo from GitHub URL
      const urlParts = newProject.githubUrl.split('/');
      const username = urlParts[urlParts.length - 2];
      const repo = urlParts[urlParts.length - 1];

      // Fetch repository data from GitHub API
      const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
      const data = await response.json();

      // Update project with GitHub data
      setNewProject(prev => ({
        ...prev,
        title: data.name,
        description: data.description || prev.description,
        technologies: data.language || prev.technologies,
      }));
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Code Integration</h2>
      
      {/* Project Form */}
      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          placeholder="Project Title"
          className="w-full p-2 border rounded"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
        />
        
        <textarea
          placeholder="Project Description"
          className="w-full p-2 border rounded h-32"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="GitHub URL"
            className="flex-1 p-2 border rounded"
            value={newProject.githubUrl}
            onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
          />
          <button
            onClick={handleGithubImport}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Import from GitHub
          </button>
        </div>

        <input
          type="text"
          placeholder="Live Demo URL"
          className="w-full p-2 border rounded"
          value={newProject.liveUrl}
          onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
        />
        
        <input
          type="text"
          placeholder="Technologies (comma-separated)"
          className="w-full p-2 border rounded"
          value={newProject.technologies}
          onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
        />
        
        <textarea
          placeholder="Code Snippet (optional)"
          className="w-full p-2 border rounded h-48 font-mono"
          value={newProject.codeSnippet}
          onChange={(e) => setNewProject({ ...newProject, codeSnippet: e.target.value })}
        />

        <button
          onClick={handleAddProject}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingIndex >= 0 ? 'Update Project' : 'Add Project'}
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 space-x-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      GitHub Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditProject(index)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeIntegration;