import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactDocker from "../../assets/files/React/Dockerfile.txt"
import ReactJenkins from "../../assets/files/React/Jenkinsfile.txt"
import FlaskDocker from "../../assets/files/Flask/Dockerfile.txt"
import FlaskJenkins from "../../assets/files/Flask/Jenkinsfile.txt"
import NodeDocker from "../../assets/files/ExpressJs/Dockerfile.txt"
import NodeJenkins from "../../assets/files/ExpressJs/Jenkinsfile.txt"

const App = ({ projectsData }) => {
  const [githubLink, setGithubLink] = useState('');
  const [selectedTool, setSelectedTool] = useState('');
  let jobname='';
  const [deploymentLink, setDeploymentLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
const[deployedData,setDeployedData] = useState([]);
const[consoleOutput,setConsole_output] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/jenkins/getDeploymentLink", {
          ProjectId: projectsData.ProjectId,
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
    jobname=githubLink.split('/').pop().replace('.git', '');
    
     
     
    // Simulate deployment process (replace with actual deployment logic)
    const deploymentResponse = simulateDeployment(githubLink, selectedTool,projectsData.ProjectId);

    setIsSubmitting(false); // Enable submit button
  };

  const simulateDeployment = async (githubLink, selectedTool,ProjectId) => {

    
    try {
      const response = await axios.post('http://localhost:3001/jenkins/createPipelineJob', {
        githubLink,
        selectedTool,
        jobname : githubLink.split('/').pop().replace('.git', ''),
        ProjectId: ProjectId,
        Type:"Backend"
      });
 

      console.log(response.data.deploymentLink);
        setDeploymentLink(response.data.deploymentLink);
        
      // Check if the request was successful
    if (response.status === 200) {
      
      // Deployment successful
      console.log(response.data.deploymentLink);
        setDeploymentLink(response.data.deploymentLink);

        handleBuildAgain(); // will be called after successful creation of pipeline
        
      setErrorMessage('');
      toast.success('Deployment successful!');
    } 
    else {
      // Deployment failed
      setDeploymentLink('');
      setErrorMessage(response.data.message); // Display error message received from Backend
      toast.error('Deployment failed: ' + response.data.message);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.log("Error" + error.response.data.message); // Display error message received from Backend
    setErrorMessage(error.response.data.message);
    toast.error('Error: ' + error.response.data.message);
  }

  };

  const handleBuildAgain = async () => {
    try {
      setConsole_output('');
      setLoading(true);
      setMessage('Building pipeline...');
      setErrorMessage('');
      const response = await axios.post('http://localhost:3001/jenkins/buildPipline', {
        ProjectId: projectsData.ProjectId,
        job_name:  deployedData.job_name || jobname ,
      });
  
      console.log(response.data.console_output);
       setConsole_output(response.data.console_output); 

      if(response.status === 200){
        toast.info(response.data.message);
        console.log(response.data.deploymentLink);
        setDeploymentLink(response.data.deploymentLink);
        setLoading(false);
        setMessage('');
      } // Log the response data if needed
  
      return response.data.message; // Return response data if needed
    } catch (error) {
      console.error('Error building pipeline:', error);
      setLoading(false);
      setMessage('');
      setErrorMessage('Error building pipeline',error.message);
      toast.error('Error building pipeline',error.message);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setMessage('Stopping pipeline...');
      setErrorMessage('');
      const response = await axios.delete('http://localhost:3001/jenkins/deletePipline', {
        params: {
          ProjectId: projectsData.ProjectId,
          job_name: deployedData.job_name || jobname,
        }
      });
      
      if(response.status === 200){
        setLoading(false);
        setMessage('');
        setDeploymentLink('')
toast.success('Pipeline stopped successfully');
      }else{
        toast.error('Error Stopping pipeline');
      }

      setLoading(false);
      setMessage('');
      setDeploymentLink('');
      setErrorMessage('');
      setGithubLink('');
      setSelectedTool('');
    } catch (error) {
      setLoading(false);
      setMessage('');
      setErrorMessage('An error occurred while Stopping . Please try again later.');
      toast.error('Error stopping pipeline');
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
          <h2 className="text-3xl font-extrabold text-center text-gray-900">Backend Deployment Manager</h2>
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
                  <option value="Node/Express js">Node/Express js</option>
                  <option value="Flask">Flask</option>
                  
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
                      className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={handleBuildAgain}
                    >
                      Build Again
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      onClick={handleDelete}
                    >
                      Stop Pipeline
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6"> Note : Update request like this ('http://localhost:3001/')
              in Backend with server Ip from deployment Link </div>
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
    <li>5. The GitHub repository should be separate for Frontend and Backend.</li>
  </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Downloadable Files</h3>
          <div className="mt-2 space-y-2">
          
          <a href={ReactDocker}   download="Dockerfile.txt" > <button className="block text-sm text-blue-600 hover:underline">
           Download Dockerfile for React.js  </button> </a>
           <a href={ReactJenkins}   download="Jenkinsfile.txt" > <button className="block text-sm text-blue-600 hover:underline">
           Download Jenkinsfile for React.js  </button> </a>

           <a href={FlaskDocker}   download="Dockerfile.txt" > <button className="block text-sm text-blue-600 hover:underline">
           Download Dockerfile for Flask  </button> </a>
           <a href={FlaskJenkins}   download="Jenkinsfile.txt" > <button className="block text-sm text-blue-600 hover:underline">
           Download Jenkinsfile for Flask  </button> </a>

           <a href={NodeDocker}   download="Dockerfile.txt" > <button className="block text-sm text-blue-600 hover:underline">
           Download Dockerfile for Node/Express  </button> </a>
           <a href={NodeJenkins}   download="Jenkinsfile.txt" > <button className="block text-sm text-blue-600 hover:underline">
           Download Jenkinsfile for Node/Express  </button> </a>
            
          </div>
        </div>
        <div className="p-4 mt-4 bg-gray-100 border rounded-lg shadow-md">
      <h2 className="mb-2 text-xl font-semibold">Console Output:</h2>
      <pre className="overflow-auto max-h-96">{consoleOutput}</pre>
    </div>
      </div>
    </div>
  );
};

export default App;
