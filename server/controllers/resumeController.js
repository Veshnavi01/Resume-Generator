const Resume = require('../models/Resume');

// @desc    Get all resumes (filtered by userId)
// @route   GET /api/v1/resumes
// @access  Private
const getResumes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, count: resumes.length, data: resumes });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single resume by ID
// @route   GET /api/v1/resumes/:id
// @access  Private
const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    // Check ownership
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this resume' });
    }
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new resume
// @route   POST /api/v1/resumes
// @access  Private
const createResume = async (req, res, next) => {
  try {
    const resumeData = { ...req.body };
    resumeData.userId = req.user.id;
    const resume = await Resume.create(resumeData);
    res.status(201).json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a resume
// @route   PUT /api/v1/resumes/:id
// @access  Private
const updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    // Check ownership
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this resume' });
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a resume
// @route   DELETE /api/v1/resumes/:id
// @access  Private
const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    // Check ownership
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this resume' });
    }

    await resume.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
};
