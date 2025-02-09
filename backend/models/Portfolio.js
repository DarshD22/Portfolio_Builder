const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  template: {
    type: String,
    required: true,
    enum: ['template1', 'template2', 'template3']
  },
  personalInfo: {
    name: String,
    title: String,
    bio: String,
    contact: {
      email: String,
      linkedin: String,
      github: String
    }
  },
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    media: [{
      type: String,
      url: String
    }]
  }],
  skills: [{
    category: String,
    items: [{
      name: String,
      level: Number,
      certificationUrl: String
    }]
  }],
  shareableLink: {
    type: String,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);