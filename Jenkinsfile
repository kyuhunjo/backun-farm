pipeline {
    agent any

    environment {
        APP_NAME = 'backun-farm'
        IMAGE_NAME = "kyuhunjo/${APP_NAME}"
        DEPLOY_DIR = '/deploy'
        HTTP_PORT = '8083'  // HTTP 포트
        DOCKER_CREDENTIALS_ID = '0dd8e584-8e25-4817-b865-bb1e8901663b'
        NETWORK_NAME = 'myeongri'
        NODE_VERSION = '18.0.0'  // Vue3 지원을 위해 Node 18 사용
    }

    stages {
        stage('Checkout') {
            steps {
                // GitHub에서 소스 코드 클론
                git url: 'https://github.com/kyuhunjo/backun-farm.git', branch: 'main', credentialsId: 'myeongrihak'
            }
        }

        stage('Build') {
            steps {
                // Docker 이미지 빌드
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Docker Hub에 이미지를 푸시
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
                    // 기존에 실행 중인 컨테이너 중지 및 삭제
                    sh "docker stop ${APP_NAME} || true"
                    sh "docker rm ${APP_NAME} || true"

                    // 새로운 컨테이너 실행
                    sh """
                    docker run -d --restart unless-stopped \
                    --name ${APP_NAME} \
                    --network ${NETWORK_NAME} \
                    -p ${HTTP_PORT}:8083 \
                    -e PORT=8083 \
                    ${IMAGE_NAME}:${env.BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Clean up old Docker images') {
            steps {
                script {
                    // 사용하지 않는 Docker 이미지를 정리
                    sh 'docker system prune -f || true'
                }
            }
        }
    }

    post {
        success {
            echo '백운마을 웹사이트가 Docker로 성공적으로 배포되었습니다.'
        }
        failure {
            echo '빌드 또는 배포 과정에서 오류가 발생했습니다.'
        }
    }
}