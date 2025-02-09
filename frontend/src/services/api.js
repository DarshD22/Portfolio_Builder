import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const portfolioService = {
  // Create new portfolio
  createPortfolio: async (portfolioData) => {
    try {
      const response = await api.post('/api/portfolios', portfolioData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get portfolio by shareable link
  getPortfolio: async (shareableLink) => {
    try {
      const response = await api.get(`/api/portfolios/${shareableLink}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

//   // Upload media
//   uploadMedia: async (file) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
      
//       const response = await api.post('/api/uploads/media', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   }
};

// // frontend/src/services/api.js
// import axios from 'axios';



export const mediaService = {
  uploadSingle: async (file, onProgress) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/api/uploads/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadMultiple: async (files, onProgress) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await api.post('/api/uploads/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteMedia: async (filename) => {
    try {
      const response = await api.delete(`/api/uploads/${filename}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};