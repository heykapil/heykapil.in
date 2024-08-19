---
title: Caching Static Content and GZIP compression for NGINX server
author: Kapil Chaudhary
logo: next.svg
tags:
  - nginx
  - cloud
created: 2024-01-11T09:39:03
updated: 2024-01-11T18:14:00
---

This is a follow-up post of the [previous post](Setting-up-Nginx-server-on-google-cloud-for-web.md) where we have created a Linux VM instance and used nginx server to host a nextjs application.

- Login into your VM with SSH where nginx is running.
- Create two new files named `browser-cache.conf` and `gzip.conf` under `/etc/nginx/snippets` with the following contents:

```bash
  sudo nano /etc/nginx/snippets/browswer-cache.conf
  sudo nano /etc/nginx/snippets/gzip.conf
```

```conf
# browser-cache.conf
# Don't cache appcache, document html and data.
  location ~* \.(?:manifest|appcache|html?|xml)$ {
  expires -1;
  }
# Cache RSS and Atom feeds.
  location ~* \.(?:rss|atom)$ {
   expires 1d;
   add_header Cache-Control "public";
   add_header Pragma "public";
  }
  location ~* \.json {
   expires 1d;
   add_header Cache-Control "public";
   add_header Pragma "public";
  }
# Caches images, icons, video, audio, HTC, etc.
  location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff|woff2|ttf|eot|otf|pdf)$ {
   expires 1y;
   add_header Cache-Control "public";
   add_header Pragma "public";
# Comment out these lines if you wish to record access/error logs for static files.
   log_not_found off;
   access_log off;
  }
# Cache CSS and JavaScript.
  location ~* \.(?:css|js)$ {
   expires 1y;
   add_header Cache-Control "public";
   add_header Pragma "public";
   access_log off;
  }
  location ~* \?sccss {
   expires 1y;
   add_header Cache-Control "public";
   add_header Pragma "public";
   access_log off;
  }
# Don't record access/error logs for robots.txt.
  location = /robots.txt {
   log_not_found off;
   access_log off;
  }
```

```conf
# gzip.conf
# Enable Gzip compression.
  gzip on;
# Disable Gzip on IE6.
  gzip_disable "msie6";
# Allow proxies to cache both compressed and regular version of file.
# Avoids clients that don't support Gzip.
  gzip_vary on;
# Compress data, even when the client connects through a proxy.
  gzip_proxied any;
# The level of compression to apply to files. A higher compression level increases
# CPU usage. Level 5 is a happy medium resulting in roughly 75% compression.
  gzip_comp_level 2;
# The minimum HTTP version of a request to perform compression.
  gzip_http_version 1.1;
# Don't compress files smaller than 256 bytes, as size reduction will be negligible.
  gzip_min_length 256;
# Compress the following MIME types.
  gzip_types
   application/atom+xml
   application/javascript
   application/x-javascript
   application/json
   application/ld+json
   application/manifest+json
   application/rss+xml
   application/vnd.geo+json
   application/vnd.ms-fontobject
   application/x-font-ttf
   application/x-font-woff
   application/x-web-app-manifest+json
   application/xhtml+xml
   application/xml
   font/opentype
   image/bmp
   image/svg+xml
   image/x-icon
   text/cache-manifest
   text/css
   text/plain
   text/vcard
   text/vnd.rim.location.xloc
   text/vtt
   text/x-component
   text/x-cross-domain-policy
   text/javascript;
# text/html is always compressed when enabled.
```

- Save these files and we will add these two snippets to our configuration file available under `/etc/nginx/sites-available`.

```bash
cd ~
cd /etc/nginx/sites-available/
sudo nano nextjs.conf
```

```conf
 server {

 server_name example.com;
 location / {
  ...
  }
  include snippets/browser-cache.conf; # BROWSER CACHE FILE
  include snippets/gzip.conf; # GZIP FILE
  ...
 }
```

- Save and test the nginx congfiguration file is ok or not. Then restart server.

- Make sure you have setup the Link between `sites-available` and `sites-enabled`.

```bash
sudo nginx -t
sudo service nginx restart
```

- Test if the gzip compression is working or not ?
