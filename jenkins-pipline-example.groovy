
    def DOCKER_IMAGE_NAME = "expense-app-web-ui"
    def DOCKER_REGISTRY = "harbor-1-1761230967-ingress.192.168.1.135.sslip.io"
    def IMAGE_TAG = "${env.BUILD_ID}" // Use Jenkins Build Number as tag


    pipeline {
        // 1. Define the agent (where the build will run).
        //    'any' means any available agent (node).
                  agent {
                kubernetes {
                    // Define a container template for the build job
                    yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker-builder
    image: docker:dind
    command: ['cat']
    tty: true
    securityContext:
      privileged: true
  - name: deno
    image: denoland/deno:latest
    command: ['cat']
    tty: true
  # Bulida continer
  - name: buildah-builder
    image: quay.io/buildah/stable:latest
    securityContext:
      privileged: true
    command:
      - cat # Keep container alive
    tty: true
    volumeMounts:
      #// Mount the registry credentials secret as a volume
      - name: k3srepo-registry-secret
        mountPath: /home/jenkins/.docker

  volumes:
    # Define the volume from your Kubernetes Secret
    - name: k3srepo-registry-secret
      secret:
        secretName: k3srepo-registry-secret  #// Replace with your secret name
"""
                    // Use the 'docker-builder' container for the shell steps
                    defaultContainer 'docker-builder'
                   // workspaceVolume persistentVolumeClaimWorkspaceVolume(claimName: 'workspace', readOnly: false)
                }
            }

        stages {

            stage("check out code ") {
                steps {
                        git branch: 'main',    url: 'https://github.com/nmajorov/expense-app-web-ui.git'

                    }

            }




          stage('Build Deno App') {
           // Define the agent for *this specific stage* to be a Docker container.

            steps {


                 container('deno') {
                // Example 1: Check Deno version (optional but good for debugging)
                sh 'deno --version'
                sh 'id -a'
                sh 'pwd'
                sh 'ls -lisa'

                sh 'deno install --allow-scripts'



                sh 'deno task  build'


                 }
            }
        }




            stage('Build and Push Docker Image') {

                    steps {
                      container('buildah-builder')  {

                                    sh "echo 'Building image ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${IMAGE_TAG}'"

                                    //sh "whoami"
                                   // sh "ls -lisa $HOME/.docker"

                                    // 1. Build the Docker image from the checked-out code
                                    sh " export BUILDAH_ISOLATION=chroot  && buildah  build -t ${DOCKER_REGISTRY}/library/${DOCKER_IMAGE_NAME}:${IMAGE_TAG} ."

                                    sh "buildah images"

                                    // Log in to the Docker Registry

                                   sh " buildah login --tls-verify=false ${DOCKER_REGISTRY} -p Harbor12345  -u admin"

                                    sh "buildah push  --tls-verify=false ${DOCKER_REGISTRY}/library/${DOCKER_IMAGE_NAME}:${IMAGE_TAG}"
                                }
                    }
            }


        }



    }
