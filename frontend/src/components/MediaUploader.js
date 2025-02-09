// frontend/src/components/MediaUploader.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const MediaUploader = ({ projects, onUpdate }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!selectedProject) {
      setError('Please select a project first');
      return;
    }

    setError(null);
    const projectIndex = projects.findIndex(p => p.title === selectedProject);
    
    for (const file of acceptedFiles) {
      try {
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 0
        }));

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:5000/api/uploads/single', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();

        // Update project with new media
        const updatedProjects = [...projects];
        if (!updatedProjects[projectIndex].media) {
          updatedProjects[projectIndex].media = [];
        }
        updatedProjects[projectIndex].media.push({
          type: data.type,
          url: data.url,
          filename: data.filename
        });

        onUpdate(updatedProjects);
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 100
        }));
      } catch (error) {
        console.error('Upload error:', error);
        setError(`Failed to upload ${file.name}`);
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 0
        }));
      }
    }
  }, [selectedProject, projects, onUpdate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  });

  const handleDeleteMedia = async (projectIndex, mediaIndex) => {
    try {
      const media = projects[projectIndex].media[mediaIndex];
      if (media.filename) {
        await fetch(`http://localhost:5000/api/uploads/${media.filename}`, {
          method: 'DELETE'
        });
      }

      const updatedProjects = [...projects];
      updatedProjects[projectIndex].media.splice(mediaIndex, 1);
      onUpdate(updatedProjects);
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete media');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Media Upload</h2>

      {/* Project Selection */}
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedProject || ''}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((project, index) => (
            <option key={index} value={project.title}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here</p>
        ) : (
          <div>
            <p className="text-gray-600">Drag & drop files here, or click to select files</p>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: JPEG, PNG, GIF, MP4, WebM (Max 10MB)
            </p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Upload Progress */}
      {Object.entries(uploadProgress).map(([filename, progress]) => (
        <div key={filename} className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">{filename}</span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ))}

      {/* Media Preview */}
      <div className="mt-8">
        {projects.map((project, projectIndex) => (
          project.media && project.media.length > 0 && (
            <div key={projectIndex} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.media.map((media, mediaIndex) => (
                  <div key={mediaIndex} className="relative group">
                    {media.type === 'image' ? (
                      <img
                        src={`http://localhost:5000${media.url}`}
                        alt={`Project media ${mediaIndex + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={`http://localhost:5000${media.url}`}
                        className="w-full h-48 object-cover rounded-lg"
                        controls
                      />
                    )}
                    <button
                      onClick={() => handleDeleteMedia(projectIndex, mediaIndex)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default MediaUploader;