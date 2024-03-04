import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';


const App = () => {
  const [githubLink, setGithubLink] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  const [jobname, setJobName] = useState('');
  const [deploymentLink, setDeploymentLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const projectData = useSelector(state => state.project);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
const[deployedData,setDeployedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/jenkins/getDeploymentLink", {
          ProjectId: projectData.ProjectId,
          Type: "Backend"
        });
        if(response.status===200){
          setDeployedData(response.data);
          setDeploymentLink(response.data.deploymentLink);
        }
       
      } catch (error) {
        console.error("Error fetching deployment link:", error);
        toast.info('No project was deployed yet')
      }
    };

    fetchData();
  }, []);


  const handleSubmit = () => {
    // Disable submit button during submission
    setIsSubmitting(true);

    // Validate inputs
    if (!githubLink || !selectedTool) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false); // Enable submit button
      return;
    }

    // Simulate deployment process (replace with actual deployment logic)
    const deploymentResponse = simulateDeployment(githubLink, selectedTool,jobname,projectData.ProjectId);

    setIsSubmitting(false); // Enable submit button
  };

  const simulateDeployment = async (githubLink, selectedTool,jobname,ProjectId) => {

    try {
      const response = await axios.post('http://localhost:3001/jenkins/createPipelineJob', {
        githubLink,
        selectedTool,
        jobname,
        ProjectId: ProjectId,
        Type:"Backend"
      });
 
      // Check if the request was successful
    if (response.status === 200) {
      handleBuildAgain(); // will be called after successful deployment
      // Deployment successful
      console.log(response.data.deploymentLink);
      setDeploymentLink(response.data.deploymentLink);
      setErrorMessage('');
      toast.success('Deployment successful!');
    } 
    else {
      // Deployment failed
      setDeploymentLink('');
      setErrorMessage(response.data.message); // Display error message received from backend
      toast.error('Deployment failed: ' + response.data.message);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.log("Error" + error.response.data.message); // Display error message received from backend
    setErrorMessage(error.response.data.message);
    toast.error('Error: ' + error.response.data.message);
  }

  };

  const handleBuildAgain = async () => {
    try {
      setLoading(true);
      setMessage('Building pipeline...');
      const response = await axios.post('http://localhost:3001/jenkins/buildPipline', {
        ProjectId: projectData.ProjectId,
        job_name: deployedData.job_name,
      });
  
      if(response.status === 200){
        toast.info(response.data.message);
        setLoading(false);
        setMessage('');
      } // Log the response data if needed
  
      return response.data; // Return response data if needed
    } catch (error) {
      console.error('Error building pipeline:', error);
      toast.error('Error building pipeline',error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:3001/jenkins/deletePipline', {
        params: {
          ProjectId: projectData.ProjectId,
          job_name: deployedData.job_name || jobname,
        }
      });
      
      if(response.status === 200){
toast.success('Pipeline deleted successfully');
      }else{
        toast.error('Error deleting pipeline');
      }


      setDeploymentLink('');
      setErrorMessage('');
      setGithubLink('');
      setSelectedTool('');
      setJobName('');
    } catch (error) {
      setErrorMessage('An error occurred while deleting. Please try again later.');
      toast.error('Error deleting pipeline');
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
   {loading ? (
          <>
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 mr-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-6 h-6 mr-1 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 mr-1 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </>
        ) : (
          <p className="text-lg font-semibold">{message}</p>
        )}
      <div className="max-w-4xl mx-auto">
        <div className="mt-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">Deployment Manager</h2>
          <div className="mt-8 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="githubLink" className="sr-only">
                  GitHub Link
                </label>
                <input
                  id="githubLink"
                  name="githubLink"
                  type="text"
                  autoComplete="off"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter GitHub Link for the Project"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="jobname" className="sr-only">
                 Job Name
                </label>
                <input
                  id="jobname"
                  name="jobname"
                  type="text"
                  autoComplete="off"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter unique job name"
                  value={jobname}
                  onChange={(e) => setJobName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="selectedTool" className="sr-only">
                  Select Tool
                </label>
                <select
                  id="selectedTool"
                  name="selectedTool"
                  autoComplete="off"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  value={selectedTool}
                  onChange={(e) => setSelectedTool(e.target.value)}
                >
                  <option value="">Select FrameWork </option>
                  <option value="node/express">Node/Express</option>
                  <option value="Flask">Flask</option>
                  <option value="springboot">Spring Boot</option>
                </select>
              </div>
              
            </div>
            <div>
              <button
                type="button"
                className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting || !!deploymentLink ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={isSubmitting || !!deploymentLink}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
          {deploymentLink && (
            <div className="p-4 mt-4 border-l-4 border-green-400 bg-green-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm1-10a1 1 0 00-2 0v3a1 1 0 102 0V6zm0 7a1 1 0 11-2 0 1 1 0 012 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{`Deployment link: ${deploymentLink}`}</p>
                  <div className="flex items-center justify-between mt-2">
                    <button
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={handleBuildAgain}
                    >
                      Build Again
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={handleDelete}
                    >
                      Delete Pipeline
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6"> Note : Update request like this ('http://localhost:3001/announcement/getall')
              with server Ip from deployment Link </div>
            </div>
          )}
          {errorMessage && (
            <div className="p-4 mt-4 border-l-4 border-red-400 bg-red-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm1-10a1 1 0 00-2 0v3a1 1 0 102 0V6zm0 7a1 1 0 11-2 0 1 1 0 012 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Prerequisites</h3>
          <p>Before proceeding with this step, ensure the following prerequisites are met:</p>
  <ul>
    <li>1. Docker and Jenkins files are provided below for download.</li>
    <li>2. These files must be present in the root area of your GitHub repository.</li>
    <li>3. Download only the relevant files that match the tool, you are using.</li>
    <li>4. The GitHub repository should be public and branch name should be main.</li>
  </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Downloadable Files</h3>
          <div className="mt-2 space-y-2">
            <a href="#" className="block text-sm text-blue-600 hover:underline">Dockerfile for React.js</a>
            <a href="#" className="block text-sm text-blue-600 hover:underline">Jenkinsfile for React.js</a>
            <a href="#" className="block text-sm text-blue-600 hover:underline">Dockerfile for Node/Express.js</a>
            <a href="#" className="block text-sm text-blue-600 hover:underline">Jenkinsfile for Node/Express.js</a>
            <a href="#" className="block text-sm text-blue-600 hover:underline">Dockerfile for Flask</a>
            <a href="#" className="block text-sm text-blue-600 hover:underline">Jenkinsfile for Flask</a>
            <a href="#" className="block text-sm text-blue-600 hover:underline">Dockerfile for Spring Boot</a>
            <a href="#" className="block text-sm text-blue-600 hover:underline">Jenkinsfile for Spring Boot</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
