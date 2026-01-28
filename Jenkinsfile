pipeline {
    agent { label 'docker-agent' }

    environment {
        PROJECT_NAME = 'elearning'
        COMPOSE_PROJECT_NAME = 'elearning'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop existing containers
                    sh "docker compose -f docker-compose.prod.yml down || true"

                    // Build and deploy with docker-compose
                    sh "docker compose -f docker-compose.prod.yml up -d --build"
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful for ${PROJECT_NAME}"
        }
        failure {
            echo "Deployment failed for ${PROJECT_NAME}"
        }
    }
}
