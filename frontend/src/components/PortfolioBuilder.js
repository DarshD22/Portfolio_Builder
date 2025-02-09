import React, { useState } from 'react';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import CodeIntegration from './CodeIntegration';
import MediaUploader from './MediaUploader';
import SkillShowcase from './SkillShowcase';
import PortfolioShare from './PortfolioShare';

const PortfolioBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: '',
      title: '',
      bio: '',
      contact: {
        email: '',
        linkedin: '',
        github: ''
      }
    },
    projects: [],
    skills: []
  });

  const [currentStep, setCurrentStep] = useState(1);

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3
  };

  const SelectedTemplateComponent = templates[selectedTemplate];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handlePersonalInfoUpdate = (info) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const handleProjectsUpdate = (projects) => {
    setPortfolioData(prev => ({
      ...prev,
      projects
    }));
  };

  const handleSkillsUpdate = (skills) => {
    setPortfolioData(prev => ({
      ...prev,
      skills
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Choose Your Template</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(templates).map((template) => (
                <div
                  key={template}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedTemplate === template ? 'border-blue-500' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <img
                    src={`/templates/${template}.png`}
                    alt={template}
                    className="w-full h-48 object-cover"
                  />
                  <p className="mt-2 text-center capitalize">
                    {template.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={portfolioData.personalInfo.name}
                onChange={(e) =>
                  handlePersonalInfoUpdate({ name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded"
                value={portfolioData.personalInfo.title}
                onChange={(e) =>
                  handlePersonalInfoUpdate({ title: e.target.value })
                }
              />
              <textarea
                placeholder="Bio"
                className="w-full p-2 border rounded"
                value={portfolioData.personalInfo.bio}
                onChange={(e) =>
                  handlePersonalInfoUpdate({ bio: e.target.value })
                }
              />
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  value={portfolioData.personalInfo.contact.email}
                  onChange={(e) =>
                    handlePersonalInfoUpdate({
                      contact: {
                        ...portfolioData.personalInfo.contact,
                        email: e.target.value
                      }
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  className="w-full p-2 border rounded"
                  value={portfolioData.personalInfo.contact.linkedin}
                  onChange={(e) =>
                    handlePersonalInfoUpdate({
                      contact: {
                        ...portfolioData.personalInfo.contact,
                        linkedin: e.target.value
                      }
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="GitHub URL"
                  className="w-full p-2 border rounded"
                  value={portfolioData.personalInfo.contact.github}
                  onChange={(e) =>
                    handlePersonalInfoUpdate({
                      contact: {
                        ...portfolioData.personalInfo.contact,
                        github: e.target.value
                      }
                    })
                  }
                />
              </div>
            </form>
          </div>
        );
      case 3:
        return <CodeIntegration projects={portfolioData.projects} onUpdate={handleProjectsUpdate} />;
      case 4:
        return <MediaUploader projects={portfolioData.projects} onUpdate={handleProjectsUpdate} />;
      case 5:
        return <SkillShowcase skills={portfolioData.skills} onUpdate={handleSkillsUpdate} />;
      case 6:
        return <PortfolioShare portfolioData={portfolioData} template={selectedTemplate} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Digital Portfolio Builder</h1>
      <div className="flex space-x-4 mb-8">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <button
            key={step}
            className={`px-4 py-2 rounded ${
              currentStep === step
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setCurrentStep(step)}
          >
            Step {step}
          </button>
        ))}
      </div>
      {renderStep()}
      <div className="mt-8 flex justify-between">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
          disabled={currentStep === 6}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PortfolioBuilder;