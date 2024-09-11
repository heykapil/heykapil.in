---
id: 4880d407-ecbf-42c1-95ef-c817ee834757
title: Tembo CA certificate download using API at build time
description: Na.
datetimeCreate: 2024-07-26 14:31:13
datetimeUpdate: 2024-07-26 17:24:18
logo: next.svg
created: 2024-07-26T18:14
updated: 2024-07-26T18:14
---

[Tembo](https://tembo.io) is a postgresql database provider with some of interesting features. I am using `node-postgres` which is a collection of `node.js` modules for interfacing with my PostgreSQL tembo database. It supports full-ssl mode and certificates for connection to database.

1. Create a tembo token before interacting with it's API [here](https://tembo.io/docs/development/api).

2. The token is a JWT token and can be verified [here](https://jwt.io)

3. Create an `.env` environment varible file for storing secrets like token, instance & organisation id of tembo.

```
// .env
TEMBO_ORG_ID="org_123...." // available in decoded jwt token
TEMBO_INST_ID="inst_123..." // find it in url bar of your instance dashboard
TEMBO_TOKEN="e..." // jwt token
``` 

4. we need dotenv package as well, install it using `npm install dotenv`

```bash
// ./setup.mjs

import path from "path";
import { spawn } from "node:child_process";
import fs from "fs";
import "dotenv/config";
const syncContentFromGit = async () => {
  const syncRun = async () => {
    const ORG_ID = process.env.TEMBO_ORG_ID;
    const INST_ID = process.env.TEMBO_INST_ID;
    const token = process.env.TEMBO_TOKEN;
    const Url = `https://api.data-1.use1.tembo.io/api/v1/orgs/${ORG_ID}/instances/${INST_ID}/secrets/certificate`;
    await runBashCommand(`
      curl -s -X 'GET' \
        ${Url} \
        -H 'accept: application/json' \
        -H "Authorization: Bearer ${token}" \
        -H 'Content-Type: application/json' \
        -o ca.crt
    `);
    // console.log(token);
    let rawdata = fs.readFileSync("./ca.crt");
// You Can add some checks if ca.crt file obtained is actually a json file or not.
    let ca = JSON.parse(rawdata);
    for (var key in ca) {
      try {
        fs.writeFileSync("./ca.crt", ca[key]);
        console.log("Writing Certificate...");
      } catch (err) {
        console.error(err);
      }
    }
  };

  let wasCancelled = true; // fetch once or keep syncing
  let syncInterval;

  const syncLoop = async () => {
    console.log("Downloading CA certificate from Tembo API...");
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
  await syncContentFromGit();
})();
```


Now, run this file `node ./setup.mjs` or club it with build command to trigger it at each build process by editing in `package.json`.
