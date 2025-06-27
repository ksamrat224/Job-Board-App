import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Filter, Search, ChevronDown, Users, Briefcase, Calendar, TrendingUp } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experienceLevel: 'Mid',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    benefits: ''
  });

  // Mock data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'Active',
      applicants: 24,
      posted: '2024-01-15',
      salary: '$120,000 - $150,000',
      experienceLevel: 'Senior'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      status: 'Active',
      applicants: 18,
      posted: '2024-01-12',
      salary: '$90,000 - $120,000',
      experienceLevel: 'Mid'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      department: 'Data',
      location: 'New York, NY',
      type: 'Internship',
      status: 'Draft',
      applicants: 0,
      posted: '2024-01-20',
      salary: '$25 - $35/hour',
      experienceLevel: 'Entry'
    }
  ]);

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      jobId: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      appliedDate: '2024-01-16',
      status: 'Under Review',
      experience: '5 years',
      location: 'San Francisco, CA',
      resumeUrl: '#'
    },
    {
      id: 2,
      jobId: 1,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      appliedDate: '2024-01-18',
      status: 'Interviewed',
      experience: '7 years',
      location: 'Remote',
      resumeUrl: '#'
    },
    {
      id: 3,
      jobId: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      appliedDate: '2024-01-14',
      status: 'Applied',
      experience: '3 years',
      location: 'Austin, TX',
      resumeUrl: '#'
    },
    {
      id: 4,
      jobId: 1,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      appliedDate: '2024-01-19',
      status: 'Applied',
      experience: '4 years',
      location: 'San Francisco, CA',
      resumeUrl: '#'
    }
  ]);

  const [filters, setFilters] = useState({
    status: '',
    department: '',
    search: '',
    jobFilter: '',
    statusFilter: ''
  });

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedJob) {
        // Update existing job
        setJobs(jobs.map(job => 
          job.id === selectedJob.id ? { 
            ...job, 
            ...jobForm,
            salary: `$${jobForm.salaryMin} - $${jobForm.salaryMax}`
          } : job
        ));
      } else {
        // Create new job
        const newJob = {
          id: Date.now(),
          ...jobForm,
          status: 'Draft',
          applicants: 0,
          posted: new Date().toISOString().split('T')[0],
          salary: `$${jobForm.salaryMin} - $${jobForm.salaryMax}`
        };
        setJobs([...jobs, newJob]);
      }
      
      handleCloseModal();
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCloseModal = () => {
    setShowJobModal(false);
    setSelectedJob(null);
    setJobForm({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      experienceLevel: 'Mid',
      salaryMin: '',
      salaryMax: '',
      description: '',
      requirements: '',
      benefits: ''
    });
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    const salaryParts = job.salary.replace(/[$,]/g, '').split(' - ');
    setJobForm({
      ...job,
      salaryMin: salaryParts[0] || '',
      salaryMax: salaryParts[1] || ''
    });
    setShowJobModal(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  const updateApplicantStatus = (applicantId, newStatus) => {
    setApplicants(applicants.map(applicant =>
      applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'Hired':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                        job.department.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = !filters.status || job.status === filters.status;
    const matchesDepartment = !filters.department || job.department === filters.department;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const filteredApplicants = applicants.filter(applicant => {
    const matchesJob = !filters.jobFilter || applicant.jobId.toString() === filters.jobFilter;
    const matchesStatus = !filters.statusFilter || applicant.status === filters.statusFilter;
    return matchesJob && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
        <p className="text-gray-600">Manage your job postings and review applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(job => job.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.reduce((sum, job) => sum + job.applicants, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(job => {
                  const posted = new Date(job.posted);
                  const now = new Date();
                  return posted.getMonth() === now.getMonth() && posted.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Applications</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(jobs.reduce((sum, job) => sum + job.applicants, 0) / jobs.length) || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'jobs', label: 'Job Postings', icon: Briefcase },
            { id: 'applicants', label: 'Applicants', icon: Users }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Jobs Tab */}
      {activeTab === 'jobs' && (
        <div>
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
              </div>
              
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>

              <select
                value={filters.department}
                onChange={(e) => setFilters({...filters, department: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Data">Data</option>
              </select>
            </div>

            <Button
              onClick={() => setShowJobModal(true)}
              className="flex items-center space-x-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Post New Job</span>
            </Button>
          </div>

          {/* Jobs Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posted
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.map(job => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.type}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.applicants}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(job.posted).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditJob(job)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Get started by posting your first job</p>
                <Button onClick={() => setShowJobModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Applicants Tab */}
      {activeTab === 'applicants' && (
        <div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
            <select
              value={filters.jobFilter}
              onChange={(e) => setFilters({...filters, jobFilter: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              <option value="">All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
            
            <select
              value={filters.statusFilter}
              onChange={(e) => setFilters({...filters, statusFilter: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Applicants Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplicants.map(applicant => {
                    const job = jobs.find(j => j.id === applicant.jobId);
                    return (
                      <tr key={applicant.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                            <div className="text-sm text-gray-500">{applicant.email}</div>
                            <div className="text-sm text-gray-500">{applicant.location}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job?.title || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {applicant.experience}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(applicant.appliedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={applicant.status}
                            onChange={(e) => updateApplicantStatus(applicant.id, e.target.value)}
                            className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(applicant.status)}`}
                          >
                            <option value="Applied">Applied</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Interviewed">Interviewed</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(applicant.resumeUrl, '_blank')}
                          >
                            View Resume
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredApplicants.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
                <p className="text-gray-600">Applications will appear here when candidates apply</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Job Modal */}
      <Modal
        isOpen={showJobModal}
        onClose={handleCloseModal}
        title={selectedJob ? 'Edit Job' : 'Post New Job'}
        size="xl"
      >
        <form onSubmit={handleJobSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={jobForm.title}
                onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={jobForm.department}
                disabled={isSubmitting}
                onChange={(e) => setJobForm({...jobForm, department: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Data">Data</option>
                <option value="HR">Human Resources</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={jobForm.location}
                onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="e.g. San Francisco, CA or Remote"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                value={jobForm.type}
                disabled={isSubmitting}
                onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={jobForm.experienceLevel}
                disabled={isSubmitting}
                onChange={(e) => setJobForm({...jobForm, experienceLevel: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
                <option value="Lead">Lead/Principal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  disabled={isSubmitting}
                  value={jobForm.salaryMin}
                  onChange={(e) => setJobForm({...jobForm, salaryMin: e.target.value})}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="flex items-center text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  disabled={isSubmitting}
                  value={jobForm.salaryMax}
                  onChange={(e) => setJobForm({...jobForm, salaryMax: e.target.value})}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              rows={6}
              required
              disabled={isSubmitting}
              value={jobForm.description}
              onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              placeholder="Describe the role, responsibilities, and what you're looking for..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            <textarea
              rows={4}
              disabled={isSubmitting}
              value={jobForm.requirements}
              onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              placeholder="List the required skills, experience, and qualifications..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefits
            </label>
            <textarea
              rows={3}
              disabled={isSubmitting}
              value={jobForm.benefits}
              onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              placeholder="Describe the benefits, perks, and company culture..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCloseModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {selectedJob ? 'Update Job' : 'Post Job'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployerDashboard;