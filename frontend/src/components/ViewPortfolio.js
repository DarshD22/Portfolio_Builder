// client/src/components/ViewPortfolio.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import { portfolioService } from '../services/api';

const ViewPortfolio = () => {
  const { shareableLink } = useParams();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await portfolioService.getPortfolio(shareableLink);
        setPortfolioData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [shareableLink]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto text-center p-8">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 text-red-500 mx-auto" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-8">
            The portfolio you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Portfolio Builder
          </button>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return null;
  }

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3
  };

  const SelectedTemplate = templates[portfolioData.template];

  if (!SelectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Template Error</h2>
          <p className="text-gray-600">
            The selected template is not available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Banner */}
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white py-2 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <p className="text-sm">
            {portfolioData ? `Viewing ${portfolioData.personalInfo?.name}'s portfolio` : 'Viewing shared portfolio'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="text-sm bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition-colors"
          >
            Create Your Own
          </button>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="pt-10">
        {portfolioData && <SelectedTemplate portfolioData={portfolioData} />}
      </div>

      {/* Bottom Attribution */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-2 z-50">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>
            Created with{' '}
            <a
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Portfolio Builder
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewPortfolio;