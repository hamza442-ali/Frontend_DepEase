pipeline {
    agent { label 'depease-local' }
    options {
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    stages {
        stage('Install') { steps { sh 'npm ci' } }
        stage('Check') { steps { sh 'npm run check && npm run format:check' } }
        stage('Build') { steps { sh 'npm run build' } }
        stage('Save build') { steps { archiveArtifacts artifacts: 'dist/**', fingerprint: true } }
    }
    // Add your hosting-specific deployment stage. Archive depease-deployment.json
    // containing the real public URL after the application has been published.
}
