import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, Building, Map, List, Heart } from 'lucide-react';

const JobListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [filters, setFilters] = useState({
    salaryRange: [0, 200000],
    experienceLevel: '',
    workType: '',
    companySize: ''
  });

  // Mock job data
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      remote: true,
      experienceLevel: 'Senior',
      companySize: 'Large',
      postedDate: '2 days ago',
      description: 'We are looking for an experienced frontend developer...',
      logo: '🏢'
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'DataFlow Labs',
      location: 'New York, NY',
      salary: '$25 - $35/hour',
      type: 'Internship',
      remote: false,
      experienceLevel: 'Entry',
      companySize: 'Medium',
      postedDate: '1 day ago',
      description: 'Join our data science team as an intern...',
      logo: '📊'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'StartupX',
      location: 'Austin, TX',
      salary: '$90,000 - $120,000',
      type: 'Full-time',
      remote: true,
      experienceLevel: 'Mid',
      companySize: 'Small',
      postedDate: '3 days ago',
      description: 'Lead product development and strategy...',
      logo: '🚀'
    }
  ]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesExperience = !filters.experienceLevel || job.experienceLevel === filters.experienceLevel;
      const matchesWorkType = !filters.workType || 
                             (filters.workType === 'remote' && job.remote) ||
                             (filters.workType === 'onsite' && !job.remote);
      const matchesCompanySize = !filters.companySize || job.companySize === filters.companySize;

      return matchesSearch && matchesExperience && matchesWorkType && matchesCompanySize;
    });

    setFilteredJobs(filtered);
  }, [debouncedSearchTerm, filters, jobs]);

  const highlightSearchTerm = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{job.logo}</span>
            <div>
              <Link 
                to={`/jobs/${job.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                dangerouslySetInnerHTML={{ 
                  __html: highlightSearchTerm(job.title, debouncedSearchTerm) 
                }}
              />
              <p 
                className="text-gray-600"
                dangerouslySetInnerHTML={{ 
                  __html: highlightSearchTerm(job.company, debouncedSearchTerm) 
                }}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span dangerouslySetInnerHTML={{ 
                __html: highlightSearchTerm(job.location, debouncedSearchTerm) 
              }} />
              {job.remote && <span className="text-green-600 font-medium">• Remote</span>}
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{job.type}</span>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{job.postedDate}</span>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="h-4 w-4" />
              </button>
              <Link
                to={`/jobs/${job.id}`}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
        <p className="text-gray-600">Discover opportunities that match your skills and interests</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search jobs, companies, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            
            {/* Salary Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="px-3">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="10000"
                  value={filters.salaryRange[1]}
                  onChange={(e) => setFilters({
                    ...filters,
                    salaryRange: [0, parseInt(e.target.value)]
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>${filters.salaryRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={filters.experienceLevel}
                onChange={(e) => setFilters({...filters, experienceLevel: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Levels</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
              </select>
            </div>

            {/* Work Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="workType"
                    value=""
                    checked={filters.workType === ''}
                    onChange={(e) => setFilters({...filters, workType: e.target.value})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">All</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="workType"
                    value="remote"
                    checked={filters.workType === 'remote'}
                    onChange={(e) => setFilters({...filters, workType: e.target.value})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remote</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="workType"
                    value="onsite"
                    checked={filters.workType === 'onsite'}
                    onChange={(e) => setFilters({...filters, workType: e.target.value})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">On-site</span>
                </label>
              </div>
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select
                value={filters.companySize}
                onChange={(e) => setFilters({...filters, companySize: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sizes</option>
                <option value="Small">Small (1-50)</option>
                <option value="Medium">Medium (51-500)</option>
                <option value="Large">Large (500+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* View Toggle & Results Count */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600">
                Showing {filteredJobs.length} of {jobs.length} jobs
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md ${
                  viewMode === 'map' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Map className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Job Results */}
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex items-center justify-center">
              <div className="text-center">
                <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Map View</h3>
                <p className="text-gray-600">Interactive map with job locations would be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">
                  Integration with Leaflet or Google Maps would show job markers
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;