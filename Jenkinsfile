pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io/shubhanshupandey70"
        FRONTEND_IMAGE = "${REGISTRY}/vajrx-frontend"
        BACKEND_IMAGE  = "${REGISTRY}/vajrx-backend"
        IMAGE_TAG = "${env.GIT_COMMIT?.take(7) ?: 'latest'}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend"
                sh "docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest"
            }
        }

        stage('Build Backend') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend"
                sh "docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest"
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'ghcr-credentials',
                    usernameVariable: 'GHCR_USER',
                    passwordVariable: 'GHCR_TOKEN'
                )]) {
                    sh "echo ${GHCR_TOKEN} | docker login ghcr.io -u ${GHCR_USER} --password-stdin"
                    sh "docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                    sh "docker push ${BACKEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                }
            }
        }

        stage('Deploy to Swarm') {
            steps {
                sh """
                    docker stack deploy \
                        --compose-file docker-stack.yml \
                        --with-registry-auth \
                        vajrx
                """
            }
        }
    }

    post {
        success {
            echo "VajrX deployed successfully — ${IMAGE_TAG}"
        }
        failure {
            echo "Deployment failed. Check logs above."
        }
    }
}
