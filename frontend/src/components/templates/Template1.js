// client/src/components/templates/Template1.jsx
import React, { useState, useEffect } from 'react';

const Template1 = ({ portfolioData }) => {
  const { personalInfo, projects, skills } = portfolioData;
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      const sections = ['home', 'projects', 'skills'];
      const currentPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });

      setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-blue-600">
              {personalInfo.name.split(' ')[0]}
            </span>
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'skills'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize ${
                    activeSection === section
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-600'
                  } transition-colors`}
                >
                  {section}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              {personalInfo.contact.github && (
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
        <div className="relative text-center space-y-6 p-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 animate-fade-in text-gray-800">
            {personalInfo.name}
          </h1>
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-blue-600">
            {personalInfo.title}
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed mb-12 text-gray-600">
            {personalInfo.bio}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {personalInfo.contact.email && (
              <a 
                href={`mailto:${personalInfo.contact.email}`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Me
              </a>
            )}
            {personalInfo.contact.linkedin && (
              <a 
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
        
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer text-blue-600"
          onClick={() => scrollToSection('projects')}
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
            Featured Projects
          </h2>
          <div className="space-y-32">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="w-full md:w-1/2 transform hover:scale-105 transition-transform duration-300">
                  {project.media && project.media[0] && (
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                      {project.media[0].type === 'image' ? (
                        <img 
                          src={project.media[0].url} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : project.media[0].type === 'video' ? (
                        <video
                          src={project.media[0].url}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
                          <span className="text-blue-600">Media Preview</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-3xl font-bold text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6 pt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        View Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillCategory, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold mb-6 text-blue-600">
                  {skillCategory.category}
                </h3>
                <div className="space-y-6">
                  {skillCategory.items.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-medium text-gray-700">
                          {skill.name}
                        </span>
                        {skill.certificationUrl && (
                          <a
                            href={skill.certificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${skill.level}%`,
                            transform: isScrolling ? 'scaleX(1.05)' : 'scaleX(1)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-12 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 text-blue-600">{personalInfo.name}</h3>
              <p className="text-gray-500">{personalInfo.title}</p>
            </div>
            <div className="flex space-x-8">
              {personalInfo.contact.email && (
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  Email
                </a>
              )}
              {personalInfo.contact.linkedin && (
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {personalInfo.contact.github && (
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template1;