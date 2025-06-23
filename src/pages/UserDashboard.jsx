import React, { useState } from 'react';
import { FileText, Heart, Upload, Trash2, Edit, Download, Eye, Plus, Calendar, MapPin, DollarSign, Building } from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  
  // Mock data
  const [applications] = useState([
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      appliedDate: '2024-01-15',
      status: 'Interviewed',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      logo: '🏢'
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      company: 'StartupX',
      appliedDate: '2024-01-10',
      status: 'Applied',
      location: 'Austin, TX',
      salary: '$90,000 - $120,000',
      logo: '🚀'
    },
    {
      id: 3,
      jobTitle: 'Data Scientist',
      company: 'DataFlow Labs',
      appliedDate: '2024-01-08',
      status: 'Rejected',
      location: 'New York, NY',
      salary: '$110,000 - $140,000',
      logo: '📊'
    },
    {
      id: 4,
      jobTitle: 'UX Designer',
      company: 'DesignStudio',
      appliedDate: '2024-01-12',
      status: 'Under Review',
      location: 'Remote',
      salary: '$85,000 - $110,000',
      logo: '🎨'
    }
  ]);

  const [savedJobs, setSavedJobs] = useState([
    {
      id: 5,
      jobTitle: 'Backend Developer',
      company: 'CloudTech',
      savedDate: '2024-01-20',
      location: 'Seattle, WA',
      salary: '$100,000 - $130,000',
      type: 'Full-time',
      notes: 'Great company culture, flexible work hours',
      logo: '☁️'
    },
    {
      id: 6,
      jobTitle: 'DevOps Engineer',
      company: 'InfraCorp',
      savedDate: '2024-01-18',
      location: 'Denver, CO',
      salary: '$95,000 - $125,000',
      type: 'Full-time',
      notes: 'Interesting tech stack, good benefits',
      logo: '⚙️'
    }
  ]);

  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: 'John_Doe_Resume_2024.pdf',
      uploadDate: '2024-01-01',
      size: '2.4 MB',
      isActive: true
    },
    {
      id: 2,
      name: 'John_Doe_Resume_Tech.pdf',
      uploadDate: '2023-12-15',
      size: '2.1 MB',
      isActive: false
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interviewed':
        return 'bg-purple-100 text-purple-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveNote = (jobId) => {
    setSavedJobs(savedJobs.map(job => 
      job.id === jobId ? { ...job, notes: noteText } : job
    ));
    setEditingNote(null);
    setNoteText('');
  };

  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const handleDeleteResume = (resumeId) => {
    setResumes(resumes.filter(resume => resume.id !== resumeId));
  };

  const handleSetActiveResume = (resumeId) => {
    setResumes(resumes.map(resume => ({
      ...resume,
      isActive: resume.id === resumeId
    })));
  };

  const UploadResumeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Resume</h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center mb-4">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <div className="text-sm text-gray-600">
            <label className="cursor-pointer text-blue-600 hover:text-blue-500">
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
              Click to upload
            </label>
            {' '}or drag and drop
          </div>
          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowUploadModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowUploadModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">Track your applications and manage your job search</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === 'Interviewed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Saved Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{savedJobs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Upload className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resumes</p>
              <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'applications', label: 'Applications', icon: FileText },
            { id: 'saved', label: 'Saved Jobs', icon: Heart },
            { id: 'resumes', label: 'Resumes', icon: Upload }
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

      {/* Tab Content */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {applications.map(app => (
              <div key={app.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{app.logo}</span>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{app.jobTitle}</h3>
                      <p className="text-gray-600">{app.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{app.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{app.salary}</span>
                        </div>
                        <span>Applied on {new Date(app.appliedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Saved Jobs</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {savedJobs.map(job => (
              <div key={job.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <span className="text-2xl">{job.logo}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{job.jobTitle}</h3>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                        <span>{job.type}</span>
                      </div>
                      
                      {/* Notes Section */}
                      <div className="mt-4">
                        {editingNote === job.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Add your notes about this job..."
                              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSaveNote(job.id)}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingNote(null);
                                  setNoteText('');
                                }}
                                className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-md p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                                <p className="text-sm text-gray-600">
                                  {job.notes || 'No notes added yet'}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  setEditingNote(job.id);
                                  setNoteText(job.notes || '');
                                }}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveSavedJob(job.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'resumes' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Resume Manager</h2>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Upload Resume</span>
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {resumes.map(resume => (
              <div key={resume.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                        <span>{resume.name}</span>
                        {resume.isActive && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Active
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Uploaded on {new Date(resume.uploadDate).toLocaleDateString()} • {resume.size}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-md">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-md">
                      <Download className="h-4 w-4" />
                    </button>
                    {!resume.isActive && (
                      <button
                        onClick={() => handleSetActiveResume(resume.id)}
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        Set as Active
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteResume(resume.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Resume Modal */}
      {showUploadModal && <UploadResumeModal />}
    </div>
  );
};

export default UserDashboard;