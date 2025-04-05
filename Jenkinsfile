pipeline {
    agent any

    environment {
        APP_NAME = 'backun-farm-frontend'
        IMAGE_NAME = "kyuhunjo/${APP_NAME}"
        DOCKER_CREDENTIALS_ID = '0dd8e584-8e25-4817-b865-bb1e8901663b'
        NETWORK_NAME = 'myeongri'
        NODE_VERSION = '18.0.0'
        WEATHER_API_KEY = credentials('weather-api-key')
        AGRI_WEATHER_API_KEY = credentials('agri-weather-api-key')
        AIR_QUALITY_API_KEY = credentials('air-quality-api-key')
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/kyuhunjo/backun-farm.git', branch: 'main', credentialsId: 'myeongrihak'
            }
        }

        stage('Build') {
            steps {
                script {
                    // 환경 변수 파일 생성
                    sh """
                    echo "WEATHER_API_KEY=${WEATHER_API_KEY}" > .env
                    echo "AGRI_WEATHER_API_KEY=${AGRI_WEATHER_API_KEY}" >> .env
                    echo "AIR_QUALITY_API_KEY=${AIR_QUALITY_API_KEY}" >> .env
                    """
                    
                    dockerImage = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        dockerImage.push('latest')
                        dockerImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker stop ${APP_NAME} || true"
                    sh "docker rm ${APP_NAME} || true"

                    sh """
                    docker run -d --restart unless-stopped \
                    --name ${APP_NAME} \
                    --network ${NETWORK_NAME} \
                    -p 8083:8083 \
                    ${IMAGE_NAME}:${env.BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Clean up old Docker images') {
            steps {
                script {
                    sh 'docker system prune -f || true'
                }
            }
        }
    }

    post {
        success {
            echo '백운마을 프론트엔드가 Docker로 성공적으로 배포되었습니다.'
        }
        failure {
            echo '빌드 또는 배포 과정에서 오류가 발생했습니다.'
        }
    }
}