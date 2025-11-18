---
id: f2f241f2-cb3f-47c8-8510-501be786b430
title: Self-Hosting Overleaf (Community Edition) on Oracle Free Tier (ARM) using Dokploy
created: 2025-11-18T00:00:00Z
updated: 2025-11-18T00:00:00Z
---

Deploying Overleaf (ShareLaTeX) on Oracle Cloud's ARM (Ampere) instances requires a bit of custom configuration because the official Docker images are built for x86 architecture. Additionally, setting up the required MongoDB Replica Set and persistent volumes in a containerized environment can be tricky.

This guide walks you through deploying the **Community Edition** using **Dokploy**, using a custom ARM64 image, Traefik for reverse proxying, and fixing common startup issues.

---

## Prerequisites

* An Oracle Cloud ARM Instance (Free Tier is fine).
* **Dokploy** installed and running.
* A domain name (e.g., `latex.your-domain.com`) pointed to your server IP.
* SSH access to your server.

---

## Step 1: Prepare the Host for MongoDB

Overleaf requires MongoDB to run as a **Replica Set**. To automate the initialization of this set, we need to place a script on the host machine that Docker will mount into the Mongo container.

SSH into your server and run the following commands:

1.  **Create a config directory:**
    ```bash
    sudo mkdir -p /opt/overleaf-config
    ```

2.  **Create the initialization script:**
    Copy and paste this entire block into your terminal:
    ```bash
    cat << 'EOF' | sudo tee /opt/overleaf-config/mongodb-init.js
    rs.initiate({
      _id: "overleaf",
      members: [{ _id: 0, host: "mongo:27017" }]
    })
    EOF
    ```

3.  **Verify the file exists:**
    ```bash
    sudo ls /opt/overleaf-config/mongodb-init.js
    ```

---

## Step 2: Dokploy Configuration

1.  Open your Dokploy Dashboard.
2.  Create a new **Project**.
3.  Select **Compose** (Docker Compose) as the deployment method.

### The Docker Compose File

Copy the configuration below. **Important:** Replace `latex.kapil.app` with your actual domain in the Traefik labels and the `OVERLEAF_SITE_URL` environment variable.

```yaml
services:
  mongo:
    image: mongo:6.0
    container_name: mongo
    command: --replSet overleaf
    restart: always
    extra_hosts:
      - mongo:127.0.0.1
    environment:
      MONGO_INITDB_DATABASE: sharelatex
    healthcheck:
      test: echo 'db.stats().ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 10s
      retries: 5
    volumes:
      - mongo_data:/data/db
      - /opt/overleaf-config/mongodb-init.js:/docker-entrypoint-initdb.d/mongodb-init.js
    networks:
      - dokploy-network
  redis:
    image: redis:6.2
    container_name: redis
    restart: always
    volumes:
      - redis_data:/data
    networks:
      - dokploy-network
  sharelatex:
    image: pingwin02/sharelatex-arm:latest
    container_name: sharelatex
    restart: always
    depends_on:
      - mongo
      - redis
    volumes:
      - sharelatex_data:/var/lib/overleaf
    environment:
      OVERLEAF_MONGO_URL: mongodb://mongo/sharelatex
      OVERLEAF_REDIS_HOST: redis
      REDIS_HOST: redis
      ENABLE_CONVERSIONS: "true"
      EMAIL_CONFIRMATION_DISABLED: "true"
      OVERLEAF_APP_NAME: latex.kapil.app
      OVERLEAF_SITE_URL: https://latex.kapil.app
    deploy:
      labels:
        - traefik.swarm.network=dokploy-network
        - traefik.http.routers.overleaf-latex-spuo1g-21-web.rule=Host(`latex.kapil.app`)
        - traefik.http.routers.overleaf-latex-spuo1g-21-web.entrypoints=web
        - traefik.http.services.overleaf-latex-spuo1g-21-web.loadbalancer.server.port=80
        - traefik.http.routers.overleaf-latex-spuo1g-21-web.service=overleaf-latex-spuo1g-21-web
        - traefik.http.routers.overleaf-latex-spuo1g-21-web.middlewares=redirect-to-https@file
        - traefik.http.routers.overleaf-latex-spuo1g-21-websecure.rule=Host(`latex.kapil.app`)
        - traefik.http.routers.overleaf-latex-spuo1g-21-websecure.entrypoints=websecure
        - traefik.http.services.overleaf-latex-spuo1g-21-websecure.loadbalancer.server.port=80
        - traefik.http.routers.overleaf-latex-spuo1g-21-websecure.service=overleaf-latex-spuo1g-21-websecure
        - traefik.http.routers.overleaf-latex-spuo1g-21-websecure.tls.certresolver=letsencrypt
        - traefik.enable=true
    networks:
      - dokploy-network
volumes:
  mongo_data: null
  redis_data: null
  sharelatex_data: null
networks:
  dokploy-network:
    external: true
```
CLick deploy.

## Step 3: Post-Install Troubleshooting

It is common to encounter specific errors on the first run. Follow these steps to resolve them.
1. Fix "Unable to Create Project" (Permission Error)
If you can log in but cannot create projects, it's because the persistent volume was initialized by the Docker daemon (root), but the application user (node / 1000) cannot write to it.

Run this command on your host server to fix ownership:
```bash
docker exec -u 0 -it $(docker ps -qf "name=sharelatex") chown -R 1000:1000 /var/lib/overleaf
```
(Note: If the command fails saying "No such container", ensure the deployment is finished and running).

2. Fix MongoDB Crash Loop (Replica Set Issue)
If the Mongo container keeps restarting or ShareLaTeX cannot connect, the replica set might not have initialized. This often happens if the data volume wasn't empty on the first boot.
Force initialization manually:

```bash
docker exec -it $(docker ps -qf "name=mongo") mongosh --eval "rs.initiate({ _id: 'overleaf', members: [{ _id: 0, host: 'mongo:27017' }] })"
```
Success indicator: If it prints `{ "ok" : 1 }`, the database is fixed. ShareLaTeX will connect automatically within 60 seconds.

3. Fix Blank Screen (Cloudflare Users)
If you see a blank screen or infinite loading, check your browser console. If you see errors related to rocket-loader.min.js violating Content Security Policy (CSP), Cloudflare is breaking the app.

The Fix:
- Log in to Cloudflare.
- Go to Speed > Optimization.
- Scroll down to Rocket Loader™ and toggle it OFF.
- Purge your Cloudflare cache.

## Step 4: Finalize Setup
Navigate to your launchpad URL to create your admin account: `https://latex.kapil.app/launchpad`

Once created, you will be redirected to the login page.

You now have a fully functional Overleaf instance running on ARM!








