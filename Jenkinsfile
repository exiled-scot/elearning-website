pipeline {
    agent { label 'docker-agent' }

    environment {
        PROJECT_NAME = 'elearning'
        COMPOSE_PROJECT_NAME = 'elearning'
        NODE_ENV = 'test'
        CI = 'true'
    }

    triggers {
        githubPush()
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_BRANCH_NAME = sh(
                        script: 'git rev-parse --abbrev-ref HEAD',
                        returnStdout: true
                    ).trim()
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    echo "Building branch: ${env.GIT_BRANCH_NAME}"
                    echo "Commit: ${env.GIT_COMMIT_SHORT}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Unit & Integration Tests') {
            steps {
                sh 'npm run test:ci'
            }
            post {
                always {
                    junit(
                        testResults: 'coverage/junit.xml',
                        allowEmptyResults: true
                    )
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
            post {
                success {
                    archiveArtifacts(
                        artifacts: 'build/**/*',
                        fingerprint: true
                    )
                }
            }
        }

        stage('E2E Tests') {
            when {
                anyOf {
                    branch 'development'
                    branch 'master'
                    branch 'main'
                    changeRequest()
                }
            }
            steps {
                sh '''
                    npx playwright install --with-deps chromium
                    npm run test:e2e -- --project=chromium
                '''
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'E2E Test Report'
                    ])
                }
            }
        }

        stage('Database Backup') {
            when {
                anyOf {
                    branch 'master'
                    branch 'main'
                }
            }
            steps {
                script {
                    echo "Creating production database backup before deployment..."
                    sh 'npm run db:backup prod || echo "Database backup skipped (database may not exist yet)"'
                }
            }
        }

        stage('Deploy to Development') {
            when {
                branch 'development'
            }
            steps {
                script {
                    echo "Deploying to development environment..."

                    // Stop existing containers
                    sh "docker compose -f docker-compose.prod.yml down || true"

                    // Build and deploy with docker-compose
                    sh """
                        export APP_DOMAIN='elearning-dev.nihilanth.co.uk'
                        export API_DOMAIN='elearning-api-dev.nihilanth.co.uk'
                        docker compose -f docker-compose.prod.yml up -d --build
                    """
                }
            }
        }

        stage('Deploy to Production') {
            when {
                anyOf {
                    branch 'master'
                    branch 'main'
                }
            }
            steps {
                script {
                    // Manual approval for production deployments
                    timeout(time: 15, unit: 'MINUTES') {
                        input(
                            message: 'Deploy to Production?',
                            ok: 'Deploy',
                            submitter: 'admin,deployer'
                        )
                    }

                    echo "Deploying to production environment..."

                    // Stop existing containers
                    sh "docker compose -f docker-compose.prod.yml down || true"

                    // Build and deploy with docker-compose
                    sh """
                        export APP_DOMAIN='elearning-demo.nihilanth.co.uk'
                        export API_DOMAIN='elearning-api.nihilanth.co.uk'
                        docker compose -f docker-compose.prod.yml up -d --build
                    """
                }
            }
        }

        stage('Health Check') {
            when {
                anyOf {
                    branch 'development'
                    branch 'master'
                    branch 'main'
                }
            }
            steps {
                script {
                    def healthUrl = ''
                    if (env.GIT_BRANCH_NAME == 'development') {
                        healthUrl = 'https://elearning-dev.nihilanth.co.uk'
                    } else {
                        healthUrl = 'https://elearning-demo.nihilanth.co.uk'
                    }

                    echo "Running health check on ${healthUrl}..."

                    // Wait for container to be ready
                    sleep(time: 10, unit: 'SECONDS')

                    // Check if the application responds
                    sh """
                        curl --fail --silent --show-error --max-time 30 \
                            ${healthUrl} > /dev/null \
                            || (echo "Health check failed!" && exit 1)
                    """

                    echo "Health check passed!"
                }
            }
        }
    }

    post {
        always {
            cleanWs(
                cleanWhenNotBuilt: false,
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true
            )
        }
        success {
            script {
                if (env.GIT_BRANCH_NAME == 'master' || env.GIT_BRANCH_NAME == 'main') {
                    echo "Production deployment successful for ${PROJECT_NAME}"
                } else if (env.GIT_BRANCH_NAME == 'development') {
                    echo "Development deployment successful for ${PROJECT_NAME}"
                } else {
                    echo "Build successful for ${PROJECT_NAME} on branch ${env.GIT_BRANCH_NAME}"
                }
            }
        }
        failure {
            script {
                echo "Build failed for ${PROJECT_NAME} on branch ${env.GIT_BRANCH_NAME}"
                // Add notification logic here (Slack, email, etc.)
            }
        }
        unstable {
            echo "Build unstable for ${PROJECT_NAME} - check test results"
        }
    }
}
