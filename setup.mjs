import path from "path";
// import dotenv from "dotenv";
import { spawn } from "node:child_process";

const syncContentFromGit = async (contentDir) => {
  const syncRun = async () => {
    const gitUrl = "https://github.com/heykapil/data-website.git";
    await runBashCommand(`
      if [ -d  "${contentDir}" ];
        then
          cd "${contentDir}"; git pull; git add .; git commit -a -m 'auto-sync'; git push;
        else
          git clone --depth 1 --single-branch ${gitUrl} ${contentDir};
      fi
    `);
  };

  let wasCancelled = true;
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
  // dotenv.config();

  // if (process.env.IS_TEMPLATE === "false") {
  //   // This means it's not the template, it's my legit site
  //   // I orderride the env variable for my site. This means that when
  //   // folks clone this repo for the first time, it will delete my personal content
  //   return;
  // }

  const contentDir = path.join(process.cwd(), "content");
  // const imagesDir = path.join(process.cwd(), "public", "images");
  // await deleteFolderRecursive(contentDir);
  // await deleteFolderRecursive(imagesDir);
  await syncContentFromGit(contentDir);
})();
