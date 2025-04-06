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
        GROQ_API_KEY = credentials('groq-api-key')
        BACKEND_HOST = 'backun-farm-backend'
        BACKEND_PORT = '8084'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/kyuhunjo/backun-farm.git', branch: 'main', credentialsId: 'myeongrihak'
            }
        }

        stage('Setup Network') {
            steps {
                script {
                    // 기존 네트워크 확인 및 생성
                    sh """
                    echo "Docker 네트워크 상태 확인 중..."
                    docker network ls
                    
                    # 네트워크가 없으면 생성
                    if ! docker network ls | grep -q ${NETWORK_NAME}; then
                        echo "Docker 네트워크 '${NETWORK_NAME}'를 생성합니다..."
                        docker network create ${NETWORK_NAME}
                    else
                        echo "Docker 네트워크 '${NETWORK_NAME}'가 이미 존재합니다."
                    fi

                    # 네트워크 상세 정보 확인
                    echo "네트워크 상세 정보:"
                    docker network inspect ${NETWORK_NAME} || true
                    """
                }
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
                    echo "VITE_API_URL=http://${BACKEND_HOST}:${BACKEND_PORT}" >> .env
                    echo "VITE_GROQ_API_KEY=${GROQ_API_KEY}" >> .env
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

                    # 네트워크 재생성 (필요한 경우)
                    if ! docker network ls | grep -q ${NETWORK_NAME}; then
                        echo "Docker 네트워크 '${NETWORK_NAME}'를 재생성합니다..."
                        docker network create ${NETWORK_NAME}
                    fi
                    """

                    // 새 컨테이너 실행
                    sh """
                    echo "새 컨테이너를 실행하고 네트워크에 연결합니다..."
                    docker run -d --restart unless-stopped \
                    --name ${APP_NAME} \
                    --network ${NETWORK_NAME} \
                    -p 8083:8083 \
                    -e VITE_API_URL=http://${BACKEND_HOST}:${BACKEND_PORT} \
                    -e VITE_GROQ_API_KEY=${GROQ_API_KEY} \
                    ${IMAGE_NAME}:${env.BUILD_NUMBER}

                    # 컨테이너가 네트워크에 연결되어 있는지 확인
                    if ! docker network inspect ${NETWORK_NAME} | grep -q ${APP_NAME}; then
                        echo "컨테이너를 네트워크에 수동으로 연결합니다..."
                        docker network connect ${NETWORK_NAME} ${APP_NAME} || true
                    fi

                    # 네트워크 연결 상태 최종 확인
                    echo "컨테이너 네트워크 연결 상태 확인:"
                    docker network inspect ${NETWORK_NAME}
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
            script {
                sh """
                echo "최종 네트워크 상태 확인:"
                docker network ls
                docker network inspect ${NETWORK_NAME}
                echo "컨테이너 상태 확인:"
                docker ps -a
                """
            }
        }
        failure {
            echo '빌드 또는 배포 과정에서 오류가 발생했습니다.'
            script {
                sh """
                echo "Docker 네트워크 상태 확인:"
                docker network ls
                docker network inspect ${NETWORK_NAME} || true
                echo "컨테이너 상태 확인:"
                docker ps -a
                """
            }
        }
    }
}