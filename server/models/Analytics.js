const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema(
  {
    podcast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Podcast',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    plays: {
      type: Number,
      default: 0
    },
    uniqueListeners: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    averageListeningTime: {
      type: Number, // in seconds
      default: 0
    },
    demographics: {
      countries: [
        {
          name: String,
          count: Number
        }
      ],
      devices: [
        {
          type: {
            type: String, // mobile, desktop, tablet
            enum: ['mobile', 'desktop', 'tablet']
          },
          count: Number
        }
      ],
      referrers: [
        {
          source: String,
          count: Number
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

AnalyticsSchema.index({ podcast: 1, date: 1 });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
