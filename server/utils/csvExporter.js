const json2csv = require('json2csv').Parser;
const fs = require('fs');
const path = require('path');

/**
 * Convert JSON data to CSV format
 * @param {Array} data - Array of objects to convert to CSV
 * @param {Array} fields - Fields to include in CSV
 * @param {String} filename - Name for the output file
 * @returns {String} Path to the generated CSV file
 */
const exportToCSV = (data, fields, filename) => {
  try {
    const json2csvParser = new json2csv({ fields });
    const csv = json2csvParser.parse(data);
    
    // Create exports directory if it doesn't exist
    const dir = path.join(__dirname, '../exports');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    
    const filePath = path.join(dir, `${filename}-${Date.now()}.csv`);
    fs.writeFileSync(filePath, csv);
    
    return filePath;
  } catch (error) {
    throw new Error(`CSV export failed: ${error.message}`);
  }
};

/**
 * Format podcast analytics data for CSV export
 * @param {Array} analyticsData - Raw analytics data
 * @returns {Object} Formatted data and fields for CSV export
 */
const formatPodcastAnalytics = (analyticsData) => {
  const fields = ['podcastId', 'title', 'plays', 'uniqueListeners', 'averageListeningTime', 'completionRate', 'date'];
  
  const formattedData = analyticsData.map(item => ({
    podcastId: item.podcast._id || item.podcast,
    title: item.podcast.title || 'Unknown',
    plays: item.plays,
    uniqueListeners: item.uniqueListeners,
    averageListeningTime: item.averageListeningTime,
    completionRate: item.completionRate,
    date: new Date(item.date).toISOString().split('T')[0]
  }));
  
  return { data: formattedData, fields };
};

module.exports = {
  exportToCSV,
  formatPodcastAnalytics
};