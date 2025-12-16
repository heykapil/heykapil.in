---
id: 9c886da3-45ae-4bc4-afd6-68cfa24e8a0a
title: Deploying encore.ts application on dokploy
created: 2025-12-16T11:56:21Z
updated: 2025-12-16T12:59:54Z
tags: [docker,encore,github]
---

This guide explains how to deploy your Encore application to Dokploy using \`dotenvx\` for managing secrets.

## Prerequisites

1. **Encore application**: One can create using `encore app create`​  . Make sure it is running and build passing. If you are using pub/sub or postgres or other infra, create a [config.json](https://encore.dev/schemas/infra.schema.json)
2. ****Encrypted .env****: I personally use [dotenvx](https://dotenvx.com) to handle my secrets. i can install it `bun add @dotenvx/dotenvx`​, it encrypts the enviroment variables `bunx dotenvx encrypt`​ to be used in the encore application just by calling `process.env.secret`​ and `import '@dotenvx/dotenvx/config'`​ at the top of helper component. Ensure your `.env`​ file is encrypted before deployment and can be committed to the repository to pass the encore build (Note: do add `.env.keys`​ in `.gitignore` this is main secret which decrypts variables).

## Deployment Steps

### 1. Create Github action workflow

This action workflow `.github/workflows/docker.yml` will create the docker-image and push it to the github container registry. We will then use this image to deploy our application. A webhook can be later added to trigger new deployment on every new image is published using this action workflow. 

```yml
name: Build & Push Docker Image

on:
  push:
    tags: ["v*.*.*"]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Install Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: 1.3.4

      - name: Install Encore
        run: |
          curl -L https://encore.dev/install.sh | bash
          echo "/home/runner/.encore/bin" >> $GITHUB_PATH

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.ACTION_GITHUB_TOKEN }}
      
      - name: Lowercase Image Name
        run: echo "IMAGE_NAME=${GITHUB_REPOSITORY,,}" >> $GITHUB_ENV

      - name: Build Docker image with Encore
        run: |
          encore build docker --arch arm64 --config ./config.json --push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.ref_name }}
          encore build docker --arch arm64 --config ./config.json --push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
      
      - name: Trigger dokploy deployment
        run: curl -X POST https://dokploy.example.com/api/deploy/compose/....
```

This workflow triggers on every new tag `v*.*.*`​ is published on the github. This can be automated running `bun run bump`​ where `bump`​is a `package.json`​ script `"bump": "bunx bumpp --execute 'git add .' --commit 'chore: release v%s' --tag 'v%s' && git push --follow-tags"`.

Further, i am using the `QEMU`​ for virtualization of `arm64`​ on non-arm github-action device, one can always use `ubuntu-24.04-arm` for github actions (not available for private repo though now) or whatever is the arch of the virtual machine.

**Note that:**  One need to add a github action secrets `ACTION_GITHUB_TOKEN`​which is a personalized token to have `delete:packages, repo, workflow, write:packages` access.

### 2. Configure Dokploy

If you want to deploy the full stack (API + Database + PubSub/NSQ), use the ****Compose**** deployment in Dokploy:

1. ****Create a New Service****: Choose ****Compose**** (sometimes called "Stack").
2. ****Copy Configuration****: Copy the contents of your `docker-compose.yml` into the raw editor.

    ```yml
    services:
      api:
        image: ghcr.io/<github-username>/<repo-name>:latest
        container_name: encore_app
        ports:
          - 4000:8080
        environment:
          - NSQD_ADDRESS=nsqd:4150
          - DOTENV_PRIVATE_KEY=${DOTENV_PRIVATE_KEY}
        depends_on:
          - nsqd
        command:
          - /app/service
        labels:
          - traefik.docker.network=dokploy-network
          - traefik.http.routers.apiencore-api-lyurgk-50-web.rule=Host(`api.example.com`)
          - traefik.http.routers.apiencore-api-lyurgk-50-web.entrypoints=web
          - traefik.http.services.apiencore-api-lyurgk-50-web.loadbalancer.server.port=8080
          - traefik.http.routers.apiencore-api-lyurgk-50-web.service=apiencore-api-lyurgk-50-web
          - traefik.http.routers.apiencore-api-lyurgk-50-web.middlewares=redirect-to-https@file
          - traefik.http.routers.apiencore-api-lyurgk-50-websecure.rule=Host(`api.example.com`)
          - traefik.http.routers.apiencore-api-lyurgk-50-websecure.entrypoints=websecure
          - traefik.http.services.apiencore-api-lyurgk-50-websecure.loadbalancer.server.port=8080
          - traefik.http.routers.apiencore-api-lyurgk-50-websecure.service=apiencore-api-lyurgk-50-websecure
          - traefik.http.routers.apiencore-api-lyurgk-50-websecure.tls.certresolver=letsencrypt
          - traefik.enable=true
        networks:
          - dokploy-network
      nsqd:
        image: nsqio/nsq
        container_name: nsqd
        command: /nsqd
        networks:
          - dokploy-network
      nsqlookupd:
        image: nsqio/nsq
        container_name: nsqlookupd
        command: /nsqlookupd
        networks:
          - dokploy-network
      nsqadmin:
        image: nsqio/nsq
        container_name: nsqadmin
        command: /nsqadmin --lookupd-http-address=nsqlookupd:4161
        depends_on:
          - nsqlookupd
        networks:
          - dokploy-network
       // add other services like postgres or other
    	...

    networks:
      dokploy-network:
        external: true

    ```
3. ****Environment Variables****:

    - Set `DOTENV_PRIVATE_KEY`​ in the environment variables tab (Use the value from `.env.keys`​ labeled `DOTENV_PRIVATE_KEY`).
4. ****Deploy****: Dokploy will pull the image from `ghcr` and start all services (API, Postgres, NSQ).

### 3. Set Environment Variables

In the ****Environment**** tab of your Dokploy service:

Add a single environment variable:

- ****Key****: `DOTENV_PRIVATE_KEY`
- ****Value****: \`k0\_...\` (The key you retrieved in Step 1)

 `dotenvx`​ will automatically detect this variable at runtime and decrypt your `.env` file.

### 4. Deploy

Click ****Deploy****!

Check the logs. You should see `[dotenvx] injecting env ...` indicating successful decryption.

---

## Troubleshooting

### "Missing .env file"

If the logs say the file is missing:

- Ensure you committed the `.env` file to git.
- Verify `encore build docker`​ included the file. Encore's build process usually packages the application code. If `dotenvx` fails to find the file, we may need to explicitly verify the Docker image contents.
