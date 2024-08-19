---
title: Fetch content from remote repo and sync builds
author: Kapil Chaudhary
created: 2023-12-21T13:11
updated: 2023-12-21T14:26
description: Fetching the content from a remote repository and sync that at build time, further using github action to trigger the deploy hook as remote content changes.
summary:  We will fetch the content from a remote repository and sync that at build time, further using github action to trigger the deploy hook.
image:
tags:
---

We will fetch the content from a remote public repository and sync that at build time, further using github action to trigger the deploy hook as remote content changes.

```js
// setup.mjs
import path from "path";
import { spawn } from "node:child_process";

const syncContentFromGit = async (contentDir) => {
  const syncRun = async () => {
    const gitUrl = "https://github.com/heykapil/data-website.git"; // git url
    await runBashCommand(`
      if [ -d  "${contentDir}" ];
        then
          cd "${contentDir}"; git pull origin main; git add .; git commit -a -m 'auto-sync'; git push origin main;
        else
          git clone --depth 1 --single-branch ${gitUrl} ${contentDir};
      fi
    `);
  };

  let wasCancelled = true; // fetch once or keep syncing
  let syncInterval;

  const syncLoop = async () => {
    console.log("Syncing content files from git");

    await syncRun();

    if (wasCancelled) return;

    syncInterval = setTimeout(syncLoop, 1000 * 60);
  };

  // Block until the first sync is done
  await syncLoop();

  return () => {
    wasCancelled = true;
    clearTimeout(syncInterval);
  };
};

const runBashCommand = (command) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, [], { shell: true });

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (data) => process.stdout.write(data));

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (data) => process.stderr.write(data));

    child.on("close", function (code) {
      if (code === 0) {
        resolve(void 0);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });

(async () => {
  const contentDir = path.join(process.cwd(), "content");
  await syncContentFromGit(contentDir);
})();
```

- Running this `node ./setup.mjs` will sync the repository content and keep it updated in the `content` directory.

- We can enable to run this setup before every build time via updating the build command in `package.json` as follows

```json
 "scripts": {
    "build": "npm run setup && next build",
    "build-only": "next build",
    "setup": "node ./setup.mjs"
  },
```

- But as soon as the remote content changes, it will not update the content, we have to manually trigger the build.

- For this, we can trigger the build via a deploy hook and github action workflow.

- Create a deploy hook, for vercel it will be something like `https://api.vercel.com/v1/integrations/deploy/abcdefgh123`

- Go to the github page of remote repository and create a github action workflow like this:

```yml
# .github/workflow/name-of-workflow.yml
name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: curl https://api.vercel.com/v1/integrations/deploy/abcdefgh123
```

- Next, we can also hide and encrypt these credentials as well.
