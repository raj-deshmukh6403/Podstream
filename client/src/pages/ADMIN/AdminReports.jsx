import React, { useState, useEffect } from 'react';
import { Download, Filter, Calendar, ArrowDown, Search, RefreshCw } from 'lucide-react';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [generatingReport, setGeneratingReport] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/reports', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setReports(data);
        setError(null);
      } else {
        setError('Failed to fetch reports');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const generateReport = async (type) => {
    setGeneratingReport(true);
    try {
      const response = await fetch('/api/admin/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          type,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } else {
        setError('Failed to generate report');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setGeneratingReport(false);
    }
  };

  // Mock report data for display purposes
  const mockReports = [
    {
      id: 1,
      name: 'Monthly User Growth Report',
      type: 'user',
      format: 'PDF',
      createdAt: '2025-03-15T10:30:00',
      createdBy: 'System',
      downloads: 12,
      status: 'Ready'
    },
    {
      id: 2,
      name: 'Q1 Podcast Performance',
      type: 'content',
      format: 'XLSX',
      createdAt: '2025-03-10T14:45:00',
      createdBy: 'Admin',
      downloads: 8,
      status: 'Ready'
    },
    {
      id: 3,
      name: 'Weekly Engagement Metrics',
      type: 'engagement',
      format: 'PDF',
      createdAt: '2025-04-01T09:15:00',
      createdBy: 'System',
      downloads: 5,
      status: 'Ready'
    },
    {
      id: 4,
      name: 'Revenue Analysis Q1 2025',
      type: 'financial',
      format: 'XLSX',
      createdAt: '2025-04-02T11:00:00',
      createdBy: 'Admin',
      downloads: 7,
      status: 'Ready'
    },
    {
      id: 5,
      name: 'Content Category Distribution',
      type: 'content',
      format: 'PDF',
      createdAt: '2025-03-28T16:20:00',
      createdBy: 'System',
      downloads: 3,
      status: 'Ready'
    }
  ];

  const filteredReports = mockReports.filter(report => {
    let matchesType = selectedReportType === 'all' || report.type === selectedReportType;
    let matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const reportTypes = [
    { id: 'all', name: 'All Reports' },
    { id: 'user', name: 'User Reports' },
    { id: 'content', name: 'Content Reports' },
    { id: 'engagement', name: 'Engagement Reports' },
    { id: 'financial', name: 'Financial Reports' }
  ];

  const handleDownload = (reportId) => {
    generateReport(reportId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => generateReport('userGrowth')}
            className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            disabled={generatingReport}
          >
            {generatingReport ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
            Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Report Generator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select 
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={(e) => setSelectedReportType(e.target.value)}
              value={selectedReportType}
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded-md p-2"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded-md p-2"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
            />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Format</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input type="radio" name="format" value="pdf" className="form-radio" defaultChecked />
                <span className="ml-2">PDF</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="format" value="xlsx" className="form-radio" />
                <span className="ml-2">Excel</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="format" value="csv" className="form-radio" />
                <span className="ml-2">CSV</span>
              </label>
            </div>
          </div>
          
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => generateReport(selectedReportType)}
            disabled={generatingReport}
          >
            {generatingReport ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Available Reports</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports..."
              className="border border-gray-300 rounded-md pl-8 py-1 px-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-2 top-2 text-gray-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{report.format}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(report.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{report.createdBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{report.downloads}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      onClick={() => handleDownload(report.id)}
                    >
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No reports found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing {filteredReports.length} of {mockReports.length} reports
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-indigo-50 text-indigo-600 font-medium text-sm">
              1
            </button>
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;