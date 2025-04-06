const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    audioFile: {
      url: {
        type: String,
        required: false
      },
      publicId: String,
      duration: Number
    },
    coverImage: {
      url: {
        type: String,
        default: 'default-podcast-cover.jpg'
      },
      publicId: String
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please select a category']
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: true
    },
    publishedAt: {
      type: Date,
      default: Date.now
    },
    seasons: {
      type: Number,
      default: 1
    },
    episode: {
      type: Number,
      default: 1
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    plays: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for podcast comments (could be added later)
PodcastSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'podcast',
  justOne: false
});

// Index for search functionality
PodcastSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Podcast', PodcastSchema);