pipeline {
    agent { label 'depease-local' }
    options { timeout(time: 20, unit: 'MINUTES'); timestamps() }
    stages {
        stage('Install') { steps { sh 'npm ci' } }
        stage('Test') { steps { sh 'npm test --if-present' } }
    }
    // Add a deployment stage for your server. Publish its actual URL by archiving
    // depease-deployment.json containing {"url":"https://your-api.example"}.
}
