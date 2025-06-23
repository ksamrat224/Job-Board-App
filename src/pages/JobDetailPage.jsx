import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, Building, Heart, Share2, Upload, Check } from 'lucide-react';

const JobDetailPage = () => {
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });

  // Mock job data
  const job = {
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
    logo: '🏢',
    description: `
      We are looking for an experienced Frontend Developer to join our dynamic team. 
      You will be responsible for building user-facing features and ensuring excellent user experience.
      
      ## Key Responsibilities
      - Develop and maintain web applications using React and modern JavaScript
      - Collaborate with designers and backend developers
      - Optimize applications for maximum speed and scalability
      - Write clean, maintainable, and well-documented code
      
      ## Requirements
      - 5+ years of experience with React and JavaScript
      - Strong understanding of HTML, CSS, and responsive design
      - Experience with state management libraries (Redux, Zustand)
      - Familiarity with modern build tools and CI/CD
      
      ## Benefits
      - Competitive salary and equity package
      - Health, dental, and vision insurance
      - Flexible work arrangements
      - Professional development budget
    `,
    company_info: {
      about: 'TechCorp Inc. is a leading technology company focused on building innovative solutions for businesses worldwide.',
      size: '1000+ employees',
      founded: '2010',
      website: 'https://techcorp.com'
    }
  };

  // Mock similar jobs
  const similarJobs = [
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'WebFlow Inc.',
      location: 'Remote',
      salary: '$90,000 - $120,000',
      logo: '💻'
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'StartupX',
      location: 'Austin, TX',
      salary: '$100,000 - $130,000',
      logo: '🚀'
    }
  ];

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (applicationStep < 3) {
      setApplicationStep(applicationStep + 1);
    } else {
      // Submit application
      alert('Application submitted successfully!');
      setIsApplying(false);
      setApplicationStep(1);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setApplicationData({
      ...applicationData,
      resume: file
    });
  };

  const ApplicationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
            <button
              onClick={() => setIsApplying(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= applicationStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < applicationStep ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < applicationStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleApplicationSubmit}>
            {/* Step 1: Personal Information */}
            {applicationStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.firstName}
                      onChange={(e) => setApplicationData({
                        ...applicationData,
                        firstName: e.target.value
                      })}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.lastName}
                      onChange={(e) => setApplicationData({
                        ...applicationData,
                        lastName: e.target.value
                      })}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({
                      ...applicationData,
                      email: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({
                      ...applicationData,
                      phone: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Resume & Cover Letter */}
            {applicationStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume & Cover Letter</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">
                      <label className="cursor-pointer text-blue-600 hover:text-blue-500">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        Click to upload
                      </label>
                      {' '}or drag and drop
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                    {applicationData.resume && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {applicationData.resume.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={6}
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({
                      ...applicationData,
                      coverLetter: e.target.value
                    })}
                    placeholder="Tell us why you're interested in this position..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {applicationStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Application</h3>
                
                <div className="bg-gray-50 rounded-md p-4 space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Name: </span>
                    <span>{applicationData.firstName} {applicationData.lastName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email: </span>
                    <span>{applicationData.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phone: </span>
                    <span>{applicationData.phone}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Resume: </span>
                    <span>{applicationData.resume ? applicationData.resume.name : 'No file uploaded'}</span>
                  </div>
                  {applicationData.coverLetter && (
                    <div>
                      <span className="font-medium text-gray-700">Cover Letter: </span>
                      <p className="text-sm text-gray-600 mt-1">{applicationData.coverLetter.substring(0, 100)}...</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => applicationStep > 1 ? setApplicationStep(applicationStep - 1) : setIsApplying(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {applicationStep > 1 ? 'Previous' : 'Cancel'}
              </button>
              
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {applicationStep === 3 ? 'Submit Application' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/jobs"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Jobs</span>
      </Link>

      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{job.logo}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600">{job.company}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>{job.location}</span>
            {job.remote && <span className="text-green-600 font-medium">• Remote</span>}
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>{job.experienceLevel}</span>
          </div>
        </div>

        <button
          onClick={() => setIsApplying(true)}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Description */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
            <div className="prose prose-blue max-w-none">
              {job.description.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                      {paragraph.replace('## ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('-')) {
                  return (
                    <li key={index} className="text-gray-700 mb-1">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm">{job.company_info.about}</p>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Size: </span>
                <span className="text-gray-600">{job.company_info.size}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Founded: </span>
                <span className="text-gray-600">{job.company_info.founded}</span>
              </div>
              <a
                href={job.company_info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Visit Website →
              </a>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
            <div className="space-y-4">
              {similarJobs.map(similarJob => (
                <Link
                  key={similarJob.id}
                  to={`/jobs/${similarJob.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{similarJob.logo}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{similarJob.title}</h4>
                      <p className="text-sm text-gray-600">{similarJob.company}</p>
                      <p className="text-sm text-gray-500">{similarJob.location}</p>
                      <p className="text-sm font-medium text-green-600">{similarJob.salary}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isApplying && <ApplicationModal />}
    </div>
  );
};

export default JobDetailPage;