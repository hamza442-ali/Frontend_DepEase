pipeline {
    agent { label 'depease-local' }
    options { timeout(time: 20, unit: 'MINUTES'); timestamps() }
    stages {
        stage('Install') { steps { sh 'npm ci' } }
        stage('Build') { steps { sh 'npm run build' } }
        stage('Save build') { steps { archiveArtifacts artifacts: 'dist/**,build/**', allowEmptyArchive: false } }
    }
    // Add your hosting-specific deployment stage. Once published, archive a
    // depease-deployment.json file containing {"url":"https://your-app.example"}.
}
