pipeline {
    agent { label 'depease-local' }
    options { timeout(time: 20, unit: 'MINUTES'); timestamps() }
    stages {
        stage('Install') { steps { sh 'python3 -m venv .venv && .venv/bin/pip install -r requirements.txt' } }
        stage('Check syntax') { steps { sh '.venv/bin/python -m compileall -q -x "(^|/)\\.venv/" .' } }
    }
    // Add your project's tests and hosting-specific deployment stage. Archive
    // depease-deployment.json with the actual published application URL.
}
