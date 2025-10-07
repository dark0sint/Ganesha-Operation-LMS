const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  materials: [{ type: String }],  // Array URL file atau text
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User ' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
