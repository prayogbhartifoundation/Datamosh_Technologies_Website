#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="/app"
BACKEND_DIR="$APP_ROOT/backend"
FRONTEND_DIR="$APP_ROOT/frontend"
WEB_ROOT="/var/www/datamosh/build"
NGINX_SITE="/etc/nginx/sites-available/datamosh"

sudo apt update
sudo apt install -y python3 python3-venv python3-pip nodejs npm nginx mongodb certbot python3-certbot-nginx
sudo npm install -g yarn pm2

# Backend environment and installation
cd "$BACKEND_DIR"
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Frontend install and build
cd "$FRONTEND_DIR"
yarn install --frozen-lockfile
yarn build

# Deploy frontend build
sudo mkdir -p "$WEB_ROOT"
sudo rm -rf "$WEB_ROOT"/*
sudo cp -r "$FRONTEND_DIR/build"/* "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT"

# Create nginx site from template
if [ -f "$APP_ROOT/nginx-host.conf" ]; then
  sudo cp "$APP_ROOT/nginx-host.conf" "$NGINX_SITE"
  sudo ln -sf "$NGINX_SITE" /etc/nginx/sites-enabled/datamosh
fi

# Enable MongoDB
sudo systemctl enable --now mongodb

# Start backend with PM2
cd "$BACKEND_DIR"
source venv/bin/activate
pm2 start ./venv/bin/uvicorn --name datamosh-backend -- server:app --host 0.0.0.0 --port 5001 --workers 2
pm2 save
pm2 startup systemd

# Reload nginx
sudo nginx -t
echo "Reloading nginx..."
sudo systemctl reload nginx

echo "Traditional host deployment setup complete."
