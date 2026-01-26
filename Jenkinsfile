pipeline {
    agent { label 'docker-agent' }

    environment {
        PROJECT_NAME = 'elearning'
        SUBDOMAIN = 'elearning-demo'
        CONTAINER_PORT = '3000'
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

        stage('Build Image') {
            steps {
                script {
                    sh "docker build -t ${PROJECT_NAME}:${BUILD_NUMBER} -t ${PROJECT_NAME}:latest ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def hostDomain = 'nihilanth.co.uk'
                    def fullHost = "${SUBDOMAIN}.${hostDomain}"

                    // Stop existing container if running
                    sh "docker stop ${PROJECT_NAME} || true"
                    sh "docker rm ${PROJECT_NAME} || true"

                    // Deploy new container with Traefik labels
                    sh """
                        docker run -d \
                            --name ${PROJECT_NAME} \
                            --restart unless-stopped \
                            --network traefik \
                            --label 'traefik.enable=true' \
                            --label 'traefik.http.routers.${PROJECT_NAME}.rule=Host(`${fullHost}`)' \
                            --label 'traefik.http.routers.${PROJECT_NAME}.entrypoints=websecure' \
                            --label 'traefik.http.routers.${PROJECT_NAME}.tls.certresolver=letsencrypt' \
                            --label 'traefik.http.services.${PROJECT_NAME}.loadbalancer.server.port=${CONTAINER_PORT}' \
                            ${PROJECT_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Deployed to https://${SUBDOMAIN}.nihilanth.co.uk"
        }
        failure {
            echo "Deployment failed for ${PROJECT_NAME}"
        }
    }
}
