import React, { useState, useEffect } from 'react';
import { portfolioService } from '../services/api';

const PortfolioShare = ({ portfolioData, template }) => {
  const [shareableLink, setShareableLink] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const generatePortfolio = async () => {
    setIsSaving(true);
    setSaveStatus('Saving portfolio...');
  
    try {
      const result = await portfolioService.createPortfolio({
        ...portfolioData,
        template
      });
      setShareableLink(`${window.location.origin}/portfolio/${result.shareableLink}`);
      setSaveStatus('Portfolio saved successfully!');
    } catch (error) {
      console.error('Error saving portfolio:', error);
      setSaveStatus('Error saving portfolio. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setSaveStatus('Link copied to clipboard!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setSaveStatus('Error copying link. Please try manually.');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Share Your Portfolio</h2>
      
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <div className="space-y-4">
          <p className="text-gray-600">
            Generate a shareable link for your portfolio that you can send to potential employers or share on social media.
          </p>
          
          <button
            onClick={generatePortfolio}
            disabled={isSaving}
            className={`w-full py-3 rounded-lg text-white transition-colors ${
              isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSaving ? 'Generating...' : 'Generate Shareable Link'}
          </button>
        </div>

        {saveStatus && (
          <div className={`p-4 rounded-lg ${
            saveStatus.includes('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {saveStatus}
          </div>
        )}

        {shareableLink && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="flex-1 p-3 border rounded-lg bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Copy
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Share on Social Media</h3>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareableLink)}&text=Check out my portfolio!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Preview Your Portfolio</h3>
              <p className="text-blue-600 mb-4">
                Your portfolio is now live! Click the button below to see how it looks.
              </p>
              <a
                href={shareableLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Portfolio
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioShare;