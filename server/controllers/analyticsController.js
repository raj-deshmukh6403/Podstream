const Analytics = require('../models/Analytics');
const Podcast = require('../models/Podcast');
const csvExporter = require('../utils/csvExporter');

// @desc    Get analytics for a podcast
// @route   GET /api/analytics/podcast/:podcastId
// @access  Private
exports.getPodcastAnalytics = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.podcastId);

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: `No podcast found with id ${req.params.podcastId}`
      });
    }

    // Check if user is authorized to view analytics
    if (podcast.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view these analytics'
      });
    }

    // Get analytics data
    const analytics = await Analytics.find({ podcast: req.params.podcastId }).sort('date');

    // Process data for dashboard
    const processedData = {
      plays: analytics.map(item => ({
        date: item.date,
        count: item.plays
      })),
      uniqueListeners: analytics.map(item => ({
        date: item.date,
        count: item.uniqueListeners
      })),
      completionRate: analytics.map(item => ({
        date: item.date,
        rate: item.completionRate
      })),
      averageListeningTime: analytics.map(item => ({
        date: item.date,
        time: item.averageListeningTime
      })),
      // Aggregate country data
      topCountries: aggregateCountryData(analytics),
      // Aggregate device data
      deviceBreakdown: aggregateDeviceData(analytics),
      // Aggregate referrer data
      topReferrers: aggregateReferrerData(analytics)
    };

    res.status(200).json({
      success: true,
      data: processedData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Record analytics event
// @route   POST /api/analytics/record
// @access  Public
exports.recordAnalyticsEvent = async (req, res, next) => {
  try {
    const { podcastId, event, data } = req.body;

    if (!podcastId || !event) {
      return res.status(400).json({
        success: false,
        message: 'Please provide podcastId and event type'
      });
    }

    // Get today's date without time for daily aggregation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find or create analytics document for today
    let analytics = await Analytics.findOne({
      podcast: podcastId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!analytics) {
      analytics = new Analytics({
        podcast: podcastId,
        date: today
      });
    }

    // Update analytics based on event type
    switch (event) {
      case 'play':
        analytics.plays += 1;
        
        // Record unique listener if we have user identifier
        if (data?.userId || data?.deviceId) {
          // This is simplified; in a real app you'd check if this user/device 
          // is already counted for today
          analytics.uniqueListeners += 1;
        }
        
        break;
        
      case 'complete':
        // Record completion and update completion rate
        analytics.completionRate = calculateCompletionRate(
          analytics.completionRate,
          analytics.plays,
          100 // This play completed 100%
        );
        break;
        
      case 'partial':
        // Record partial completion and update completion rate
        if (data?.percentage) {
          analytics.completionRate = calculateCompletionRate(
            analytics.completionRate,
            analytics.plays,
            data.percentage
          );
        }
        
        // Update average listening time
        if (data?.listeningTime) {
          analytics.averageListeningTime = (
            (analytics.averageListeningTime * (analytics.plays - 1) + data.listeningTime) / 
            analytics.plays
          );
        }
        break;
        
      case 'demographic':
        // Record country
        if (data?.country) {
          const countryIndex = analytics.demographics.countries.findIndex(
            c => c.name === data.country
          );
          
          if (countryIndex >= 0) {
            analytics.demographics.countries[countryIndex].count += 1;
          } else {
            analytics.demographics.countries.push({
              name: data.country,
              count: 1
            });
          }
        }
        
        // Record device
        if (data?.device) {
          const deviceIndex = analytics.demographics.devices.findIndex(
            d => d.type === data.device
          );
          
          if (deviceIndex >= 0) {
            analytics.demographics.devices[deviceIndex].count += 1;
          } else {
            analytics.demographics.devices.push({
              type: data.device,
              count: 1
            });
          }
        }
        
        // Record referrer
        if (data?.referrer) {
          const referrerIndex = analytics.demographics.referrers.findIndex(
            r => r.source === data.referrer
          );
          
          if (referrerIndex >= 0) {
            analytics.demographics.referrers[referrerIndex].count += 1;
          } else {
            analytics.demographics.referrers.push({
              source: data.referrer,
              count: 1
            });
          }
        }
        break;
        
      default:
        break;
    }

    await analytics.save();

    res.status(200).json({
      success: true,
      message: 'Analytics recorded successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user analytics (all user's podcasts)
// @route   GET /api/analytics/user
// @access  Private
exports.getUserAnalytics = async (req, res, next) => {
  try {
    // Get all podcasts by user
    const podcasts = await Podcast.find({ creator: req.user.id });
    const podcastIds = podcasts.map(podcast => podcast._id);
    
    // Get analytics for all user's podcasts
    const analytics = await Analytics.find({
      podcast: { $in: podcastIds }
    }).populate('podcast', 'title');
    
    // Process data
    const totalPlays = analytics.reduce((sum, item) => sum + item.plays, 0);
    const totalUniqueListeners = analytics.reduce((sum, item) => sum + item.uniqueListeners, 0);
    
    // Get top podcasts by plays
    const podcastAnalytics = {};
    
    analytics.forEach(item => {
      const podcastId = item.podcast._id.toString();
      
      if (!podcastAnalytics[podcastId]) {
        podcastAnalytics[podcastId] = {
          title: item.podcast.title,
          plays: 0,
          uniqueListeners: 0
        };
      }
      
      podcastAnalytics[podcastId].plays += item.plays;
      podcastAnalytics[podcastId].uniqueListeners += item.uniqueListeners;
    });
    
    const topPodcasts = Object.values(podcastAnalytics)
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 5);
    
    res.status(200).json({
      success: true,
      data: {
        totalPlays,
        totalUniqueListeners,
        topPodcasts,
        podcastCount: podcasts.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export analytics to CSV
// @route   GET /api/analytics/export/:podcastId
// @access  Private
exports.exportAnalytics = async (req, res, next) => {
  try {
    const podcast = await Podcast.findById(req.params.podcastId);

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: `No podcast found with id ${req.params.podcastId}`
      });
    }

    // Check if user is authorized
    if (podcast.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to export these analytics'
      });
    }

    // Get analytics data
    const analytics = await Analytics.find({ podcast: req.params.podcastId })
      .sort('date')
      .populate('podcast', 'title');
      
    // Convert to CSV
    const csvData = await csvExporter.convertAnalyticsToCSV(analytics);
    
    res.header('Content-Type', 'text/csv');
    res.attachment(`podcast-analytics-${req.params.podcastId}.csv`);
    res.send(csvData);
  } catch (error) {
    next(error);
  }
};

// Helper function to calculate weighted completion rate
function calculateCompletionRate(currentRate, totalPlays, newPercentage) {
  if (totalPlays <= 1) return newPercentage;
  
  return ((currentRate * (totalPlays - 1)) + newPercentage) / totalPlays;
}

// Helper function to aggregate country data
function aggregateCountryData(analytics) {
  const countryMap = {};
  
  analytics.forEach(item => {
    item.demographics.countries.forEach(country => {
      if (!countryMap[country.name]) {
        countryMap[country.name] = 0;
      }
      countryMap[country.name] += country.count;
    });
  });
  
  return Object.entries(countryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

// Helper function to aggregate device data
function aggregateDeviceData(analytics) {
  const deviceMap = {
    mobile: 0,
    desktop: 0,
    tablet: 0
  };
  
  analytics.forEach(item => {
    item.demographics.devices.forEach(device => {
      deviceMap[device.type] += device.count;
    });
  });
  
  return Object.entries(deviceMap)
    .map(([type, count]) => ({ type, count }));
}

// Helper function to aggregate referrer data
function aggregateReferrerData(analytics) {
  const referrerMap = {};
  
  analytics.forEach(item => {
    item.demographics.referrers.forEach(referrer => {
      if (!referrerMap[referrer.source]) {
        referrerMap[referrer.source] = 0;
      }
      referrerMap[referrer.source] += referrer.count;
    });
  });
  
  return Object.entries(referrerMap)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}