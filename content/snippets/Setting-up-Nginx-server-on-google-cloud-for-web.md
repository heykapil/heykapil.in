---
title: Setting up Nginx server on google cloud for web
author: Kapil Chaudhary
logo: next.svg
tags:
  - nginx
  - cloud
created: 2023-11-29T09:39:03
updated: 2023-12-14T18:14:00
---

- Go to the [google console cloud](https://console.cloud.google.com/) and create a new project.

- Under this project, navigate to `Compute engine` >> `VM instance` usually on the left sidebar of cloud console.

- Create a new VM instance and select zone nearby to your location.

- Once the instance is created, you will see External IP address like `xx.xxx.xxx.xxx`. Save it.

- Now go to your terminal and create ssh keys for the connection.

```bash
 ssh-keygen -t rsa -b 4096 -C "your_google_username@gmail.com"
```

- Generate and locate the ssh private key and public key pair `/User/kapil/.ssh/key-name` and `/User/kapil/.ssh/key-name.pub` .
- Copy the content of the ssh public key (_key-name.pub_) and paste it in the ssh keys settings of the instance.Try to make a ssh connection to remote from the browser.
- Go to the VS code and open a remote window and `Connect to host` >> `Add new host`.

```bash
 ssh your_google_username@xx.xxx.xxx.xxx
 // xx.xxx.xxx.xxx is the External IP
```

- If the connection establishes, well and good otherwise check the ssh config file `/Users/xx/.ssh/config_`

```txt
  Host xx.xxx.xxx.xxx
   HostName xx.xxx.xxx.xxx
   User your-google-username
   IdentityFile ~/.ssh/key-name
```

- Sometimes we get a complaint of publicaly accesible private key so we need to hide the private key using chmod command as well.

```bash
chmod 400 ~/.ssh/key-name
```

- Once the ssh connection establishes, open a new terminal window.
- Remove the apache2 files if any left.

```bash
 sudo apt-get purge apache2*
 sudo apt-get remove apache2*
 sudo apt update && sudo apt upgrade -y
```

- Install Nodejs and Npm

```bash
    sudo apt install -y nodejs
    node -v

    sudo apt install -y npm
    npm -v

    sudo apt update && sudo apt upgrade -y
```

- Install nginx

```bash
 sudo apt install nginx
```

- Installing `ufw` and create a firewall, Make sure to allow ssh port otherwise you will be locked out.

```bash
 sudo apt install ufw
 sudo ufw enable
 # enabling firewall
 sudo ufw status
 # status of ufw firewall
 sudo ufw allow 22
 # open ssh port 22
 sudo ufw allow 'NGinx HTTPS'
 #  open 443 port for ssl/tls
 sudo ufw allow 'Nginx HTTP'
 # open 80 port for http
 sudo ufw allow PORT_NUMBER
 # open custom PORT_NUMBER
```

- Create a new Nginx configuration file for your Next.js application. (name anything you want, i have named it `nextjs.conf`)

```bash
 sudo nano /etc/nginx/sites-available/nextjs.conf
```

- Paste the following configuration file in this. Save and close.

```bash
 server {
 listen 80;
 server_name xx.xxx.xxx.xxx;
 location / {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  }
 }
```

> [!success] Note
>
> 1. You can replace external-ip xx.xxx.xxx.xxx with your subdomain/domain if you have pointed the domain in the DNS configuration to this ip address.
> 2. As NextJS app runs on 3000 port on localhost. So, we are using reverse proxy to listen http port 80 to this.

- Make a symbolic link between site-enabled and site-available configuration files. In case if there is some default or other configuration file then remove these files using rm command. If symbolic link does not establish due to existing file, force overwriting file using `-sf` flag instad of `-s` flag.

```bash
 sudo ln -s /etc/nginx/sites-available/nextjs.conf /etc/nginx/sites-enabled/
 sudo rm /etc/nginx/sites-enabled/default.conf
```

- Test the configuration files and restart the Nginx server.

```bash
sudo systemctl start nginx
// Start nginx server

sudo systemctl enable nginx
// Enable nginx server

sudo service nginx restart
// for restart

sudo service nginx status
// for status

sudo service nginx stop
// for stopping server

sudo service nginx start
// for starting nginx server

sudo systemctl reload nginx
// for reload nginx server

sudo nginx -t
// for testing config files
```

- Source code of the app. Name of the directory can be anything(of your choice) i'm making folder named `nextjs`

```bash
cd ~
cd /var/www/
mkdir nextjs
cd nextjs
```

- Install `git` and clone the source code of the application from the repository inside the folder `/var/www/nextjs`.

```bash
 sudo apt install git
 git --version
 cd /var/www/nextjs
 sudo git clone https://github.com/github-username/github-repo.git .
```

> [!warning] Note
> Make sure you place dot (.) after in the git clone command otherwise it will make a new folder named `github-repo` inside the folder `/var/www/nextjs`

- Install dependencies, check if the app builds in the remote. Do not forget to add or edit your environment variables if used.

```bash
sudo npm install
sudo npm run build
```

- If build is successful, run the npm server on 3000 port.

```bash
sudo npm start
```

- Visit the ip address `xx.xxx.xxx.xxx` or your domain / subdomain. If the site is running, well and good otherwise make changes in nginx configuration files.

- Install pm2 which keeps our localhost server running in background.

```bash
cd ~
sudo npm install -g pm2
```

- Change directory to root of source code and create a pm2 process.

```bash
cd /var/www/nextjs
sudo pm2 start npm --name "nextjs" -- start
sudo pm2 startup
sudo pm2 save
```

- List process running on the port (3000 here)!

```bash
sudo lsof -i:3000
sudo kill -9 PID # Kill port
sudo kill -9 $(lsof -i:3000 -t)
```

- Installing SSL/HTTPS certificates with certbot. It will issue Letsencrypt free certificate to your domain name (ip-address are not supported). Dry run will simulate the auto-renew process.

```bash
 sudo apt install certbot python3-certbot-nginx
 sudo certbot --nginx -d yourdomain.com -d www.your-domain.com
 sudo systemctl status certbot.timer
 sudo certbot renew --dry-run
```

- Cerbot will overwrite the nginx configuration files by redirecting traffic to 443 port and defining certificate paths.

- Enabling http2 is very simple, just add `http2`in the listen line under the sever of the configuration file.

```bash
 sudo nano /etc/nginx/sites-available/nextjs.conf
```

```conf:nextjs.conf
server {
   listen 443 ssl http2;
    server_name example.com
    ...
}
```

Planned in next post that will discuss about:

- [Caching static content and Gzip compression](gzip-browser-cache-nginx.md)
- Nginx load balancer
