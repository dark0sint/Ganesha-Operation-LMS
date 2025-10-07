const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');

// Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create course (guru only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'guru') return res.status(403).json({ msg: 'Access denied' });
  try {
    const course = new Course({ ...req.body, instructor: req.user.id });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Enroll course (siswa only)
router.post('/:id/enroll', auth, async (req, res) => {
  if (req.user.role !== 'siswa') return res.status(403).json({ msg: 'Access denied' });
  try {
    const course = await Course.findById(req.params.id);
    if (!course.enrolledStudents.includes(req.user.id)) {
      course.enrolledStudents.push(req.user.id);
      await course.save();
    }
    res.json({ msg: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update/Delete course (instructor only) - Implementasi sederhana, tambahkan sesuai kebutuhan

module.exports = router;
