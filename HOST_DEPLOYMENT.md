# Traditional Non-Docker Deployment Guide

This guide is for hosting the Datamosh app on a Linux server without Docker. It covers backend Python environment setup, frontend node install/build, MongoDB, PM2, and Nginx configuration.

## Overview

- Backend: Python + FastAPI + Uvicorn
- Frontend: React + Yarn build
- Reverse proxy: Nginx
- Process manager: PM2
- Database: MongoDB
- API domain: `apii.datamoshtechnologies.com`
- Main site: `datamoshtechnologies.com`, `www.datamoshtechnologies.com`

## Prerequisites

Install the required packages before setup:

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip nodejs npm nginx mongodb certbot python3-certbot-nginx
sudo npm install -g yarn pm2
```

> If you already have Node 18 installed, use that. This guide assumes `node`/`npm`/`yarn` are available.

## Repository Setup

```bash
cd /app
git pull origin main
```

## Backend Setup

1. Create and activate a virtual environment:

```bash
cd /app/backend
python3 -m venv venv
source venv/bin/activate
```

2. Install Python dependencies:

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

3. Configure backend environment variables in `/app/backend/.env`.

Example:

```bash
cat > /app/backend/.env << 'EOF'
MONGO_URL="mongodb://127.0.0.1:27017"
DB_NAME="test_database"
CORS_ORIGINS="https://datamoshtechnologies.com,https://www.datamoshtechnologies.com,https://apii.datamoshtechnologies.com"
ADMIN_API_KEY="CHANGE_THIS_TO_A_SECURE_KEY"
APP_DOMAIN=datamoshtechnologies.com
EOF
```

4. Start the backend with PM2:

```bash
cd /app/backend
pm2 start ./venv/bin/uvicorn --name datamosh-backend -- server:app --host 0.0.0.0 --port 5001 --workers 2
pm2 save
pm2 startup systemd
```

If you prefer to test without PM2 first:

```bash
cd /app/backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 5001
```

## Frontend Setup

1. Install Node dependencies:

```bash
cd /app/frontend
yarn install --frozen-lockfile
```

2. Ensure frontend is configured to talk to the API subdomain:

```bash
cat > /app/frontend/.env << 'EOF'
REACT_APP_BACKEND_URL=https://apii.datamoshtechnologies.com
WDS_SOCKET_PORT=443
REACT_APP_DOMAIN=datamoshtechnologies.com
ENABLE_HEALTH_CHECK=false
EOF
```

3. Build the frontend:

```bash
cd /app/frontend
yarn build
```

4. Copy the production build to the web root:

```bash
sudo mkdir -p /var/www/datamosh/build
sudo rm -rf /var/www/datamosh/build/*
sudo cp -r /app/frontend/build/* /var/www/datamosh/build/
sudo chown -R www-data:www-data /var/www/datamosh/build
```

## MongoDB Setup

Use local MongoDB or a managed service.

### Local MongoDB (Ubuntu)

```bash
sudo systemctl enable --now mongodb
sudo systemctl status mongodb
```

Verify connection:

```bash
mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
```

## Nginx Setup

1. Copy the host-ready Nginx config into place:

```bash
sudo cp /app/nginx-host.conf /etc/nginx/sites-available/datamosh
sudo ln -sf /etc/nginx/sites-available/datamosh /etc/nginx/sites-enabled/datamosh
```

2. Update certificate paths inside `/etc/nginx/sites-available/datamosh` if necessary.

3. Test Nginx config and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificates

Use Certbot to obtain certificates for both domains:

```bash
sudo certbot certonly --nginx \
  -d datamoshtechnologies.com \
  -d www.datamoshtechnologies.com \
  -d apii.datamoshtechnologies.com \
  --email your-email@example.com --agree-tos --non-interactive
```

Then make sure the certificate paths in `/etc/nginx/sites-available/datamosh` match the generated files.

### Renewal Cron

```bash
sudo crontab -e
```

Add:

```cron
0 3 * * * certbot renew --quiet && systemctl reload nginx
```

## Firewall Rules

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## Verify the App

- Frontend: `https://datamoshtechnologies.com`
- API health: `https://apii.datamoshtechnologies.com/health`

Check backend logs:

```bash
pm2 logs datamosh-backend
```

Check Nginx logs:

```bash
sudo tail -f /var/log/nginx/access.log /var/log/nginx/error.log
```

## Helpful Commands

```bash
# Backend process
pm2 status
pm2 restart datamosh-backend
pm2 stop datamosh-backend
pm2 delete datamosh-backend

# React production build
cd /app/frontend
yarn build
sudo cp -r build/* /var/www/datamosh/build/

# Nginx
sudo nginx -t
sudo systemctl reload nginx
```

## Notes

- If you want to serve the API path under the same domain, change `location /api/` in Nginx and adjust frontend `REACT_APP_BACKEND_URL` accordingly.
- Keep `backend/.env` secret and never commit it.
- Use a strong `ADMIN_API_KEY`.

---

## Existing file locations in this repo

- `nginx-host.conf` — host-ready Nginx config for traditional deployment
- `frontend/.env` — frontend backend URL settings
- `backend/.env` — backend environment settings
- `backend/requirements.txt` — Python dependencies
- `frontend/package.json` — React build scripts
