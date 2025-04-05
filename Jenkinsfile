pipeline {
    agent any

    environment {
        APP_NAME = 'backun-farm-frontend'
        DOCKER_USERNAME = 'joe2424'
        IMAGE_NAME = "${DOCKER_USERNAME}/${APP_NAME}"
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
                        sh """
                        docker tag ${IMAGE_NAME}:${env.BUILD_NUMBER} ${IMAGE_NAME}:latest
                        docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}
                        docker push ${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // 기존 컨테이너 정리
                    sh """
                    # 8083 포트를 사용하는 컨테이너 찾기
                    PORT_CONTAINER=\$(docker ps -q --filter publish=8083)
                    if [ ! -z "\$PORT_CONTAINER" ]; then
                        echo "포트 8083을 사용하는 컨테이너를 중지하고 제거합니다..."
                        docker stop \$PORT_CONTAINER
                        docker rm \$PORT_CONTAINER
                    fi

                    # 이름으로 컨테이너 찾기
                    NAME_CONTAINER=\$(docker ps -aq --filter name=${APP_NAME})
                    if [ ! -z "\$NAME_CONTAINER" ]; then
                        echo "이름이 ${APP_NAME}인 컨테이너를 중지하고 제거합니다..."
                        docker stop \$NAME_CONTAINER
                        docker rm \$NAME_CONTAINER
                    fi
                    """

                    // 새 컨테이너 실행
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