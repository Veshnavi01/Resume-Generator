const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: { 
    type: String, 
    required: [true, 'Institution is required'] 
  },
  degree: { 
    type: String, 
    required: [true, 'Degree is required'] 
  },
  fieldOfStudy: String,
  startDate: String,
  endDate: String,
  current: { type: Boolean, default: false },
  description: String,
});

const ExperienceSchema = new mongoose.Schema({
  company: { 
    type: String, 
    required: [true, 'Company is required'] 
  },
  position: { 
    type: String, 
    required: [true, 'Position is required'] 
  },
  location: String,
  startDate: String,
  endDate: String,
  current: { type: Boolean, default: false },
  description: String,
});

const ProjectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Project title is required'] 
  },
  description: { 
    type: String, 
    required: [true, 'Project description is required'] 
  },
  technologies: [String],
  link: String,
});

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  personalDetails: {
    fullName: { 
      type: String, 
      required: [true, 'Name is required'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    phone: String,
    address: String,
    website: String,
    linkedin: String,
    github: String,
    summary: String,
  },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: {
    technical: { type: [String], default: [] },
    soft: { type: [String], default: [] },
    languages: { type: [String], default: [] },
  },
  projects: [ProjectSchema],
  templateId: {
    type: String,
    default: 'modern',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Resume', ResumeSchema);
