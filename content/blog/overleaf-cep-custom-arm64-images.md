---
id: c8487916-4877-4d94-8de3-e8e7687d7787
title: ARM64 Docker images of Overleaf extended
created: 2025-11-28T00:00:00Z
updated: 2025-11-28T00:00:00Z
---

If you're trying to run this on **ARM64 hardware** (Raspberry Pi, Apple Silicon, Oracle Ampere etc.), You can build the arm64 images yourself using GitHub actions (which now supports arm on linux and windows, earlier have to use `QEMU` for virtualization of arm devices) or can use already built `heykapil/overleaf:latest` by me (`ext-ce` branch) .

### Build the Base Image
      -  Use `Dockerfile-base` to build the heavy dependency base image containing `texlive` installation.
      -  Usually takes longer time and rarely needs to be changed. (~2 hrs on amd/intel and ~30 min for arm)
      -  Base image workflow
          ```yaml
          on:
            workflow_dispatch:
            schedule:
              - cron: '0 0 1 * *'
          
          jobs:
            build-base:
              runs-on: ubuntu-24.04-arm
              steps:
                - name: Checkout Repository
                  uses: actions/checkout@v4
                  with:
                    repository: yu-i-i/overleaf-cep
                    ref: ext-ce
                    path: overleaf
          
                - name: Login to Docker Hub
                  uses: docker/login-action@v3
                  with:
                    username: ${{ secrets.DOCKER_USERNAME }}
                    password: ${{ secrets.DOCKER_PASSWORD }}
          
                - name: Setup Docker Buildx
                  uses: docker/setup-buildx-action@v3
          
                - name: Build and Push Base
                  working-directory: overleaf
                  run: |
                    sed -i 's/scheme-basic/scheme-full/g' server-ce/Dockerfile-base
                    
                    docker buildx build \
                      --platform linux/arm64 \
                      --file server-ce/Dockerfile-base \
                      --tag ${{ secrets.DOCKER_USERNAME }}/overleaf-base:latest \
                      --push .)
          ```    
              

### Build the main image
      -  Use `Dockerfile` to build the main image extending the base image.
      -  Usually takes less time compared to base image. (~30 mins on amd/intel and ~10 min for arm)
      - Main image workflow
        ```yaml
        name: Release Overleaf App (Daily)
        
        on:
          workflow_dispatch:
          schedule:
            - cron: '0 0 * * *'
        
        jobs:
          build-app:
            runs-on: ubuntu-24.04-arm
            steps:
              - name: Checkout Repository
                uses: actions/checkout@v4
                with:
                  repository: yu-i-i/overleaf-cep
                  ref: ext-ce
                  path: overleaf
                  fetch-depth: 0
        
              - name: Login to Docker Hub
                uses: docker/login-action@v3
                with:
                  username: ${{ secrets.DOCKER_USERNAME }}
                  password: ${{ secrets.DOCKER_PASSWORD }}
        
              - name: Setup Docker Buildx
                uses: docker/setup-buildx-action@v3
        
              - name: Generate Release Tags
                id: meta
                working-directory: overleaf
                run: |
                  git fetch --tags
                  UPSTREAM_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "no-tag")
                  echo "Detected Version: $UPSTREAM_TAG"
                  echo "version=$UPSTREAM_TAG" >> $GITHUB_OUTPUT
        
              - name: Build and Push App
                working-directory: overleaf
                run: |
                  # Patch Dockerfile to use the monthly base image
                  sed -i "s|sharelatex/sharelatex-base[^ ]*|${{ secrets.DOCKER_USERNAME }}/overleaf-base:latest|g" server-ce/Dockerfile
                  
                  TAGS="--tag ${{ secrets.DOCKER_USERNAME }}/overleaf:latest"
                  if [ "${{ steps.meta.outputs.version }}" != "no-tag" ]; then
                     TAGS="$TAGS --tag ${{ secrets.DOCKER_USERNAME }}/overleaf:${{ steps.meta.outputs.version }}"
                  fi
        
                  docker buildx build \
                    --platform linux/arm64 \
                    --file server-ce/Dockerfile \
                    $TAGS \
                    --push .
        ```
      
- Set the github action secrets (`DOCKER_USERNAME` and `DOCKER_PASSWORD`) before running workflow , and setup cron-schedule time accordingly, in above base image is updated monthly and main image daily.
