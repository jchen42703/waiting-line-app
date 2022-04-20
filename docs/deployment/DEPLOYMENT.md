```
# sudo apt update && sudo apt upgrade
sudo apt update

sudo apt install nginx
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
sudo ufw status
systemctl status nginx
```

```
git clone https://github.com/jchen42703/waiting-line-app.git
yarn install
yarn start
```

## Setup nginx

`nano /etc/nginx/sites-available/default`:

```
server {
    server_name waitinglyne.org www.waitinglyne.org;
    listen 80;

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
    }
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

```
sudo nginx -t
```

To restart

```
sudo systemctl restart nginx
```

## Certbot

```bash
apt-get upgrade
sudo apt-get install certbot
apt-get install python3-certbot-nginx

# test
sudo certbot --nginx --staging -d waitinglyne.org -d www.waitinglyne.org

# real cert
sudo certbot --nginx -d waitinglyne.org -d www.waitinglyne.org
```
