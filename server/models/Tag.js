const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a tag name'],
      unique: true,
      trim: true,
      maxlength: [30, 'Tag name cannot be more than 30 characters']
    },
    slug: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

// Create slug from name before saving
TagSchema.pre('save', function (next) {
  this.slug = this.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
  next();
});

module.exports = mongoose.model('Tag', TagSchema);