# Datamosh Technologies - Deployment Guide

## Domain Configuration
**Primary Domain:** datamoshtechnologies.com  
**API Subdomain:** apii.datamoshtechnologies.com  
**Redirects:** www.datamoshtechnologies.com → datamoshtechnologies.com

---

## Prerequisites

- Docker and Docker Compose installed
- SSL certificates (Let's Encrypt or custom)
- Domain DNS configured
- Ubuntu/Debian server with root access

---

## SSL Certificate Setup (Let's Encrypt)

### Option 1: Using Certbot (Recommended)

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx -y

# Create SSL directory
sudo mkdir -p /app/ssl

# Generate certificates
sudo certbot certonly --standalone \
  -d datamoshtechnologies.com \
  -d www.datamoshtechnologies.com \
  -d apii.datamoshtechnologies.com \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive

# Copy certificates to app directory
sudo cp /etc/letsencrypt/live/datamoshtechnologies.com/fullchain.pem /app/ssl/
sudo cp /etc/letsencrypt/live/datamoshtechnologies.com/privkey.pem /app/ssl/
sudo chown -R $(whoami):$(whoami) /app/ssl
```

### Option 2: Using Existing Certificates

```bash
# Copy your existing certificates
cp /path/to/fullchain.pem /app/ssl/
cp /path/to/privkey.pem /app/ssl/
```

### Auto-renewal with Certbot

```bash
# Edit crontab
sudo crontab -e

# Add this line for daily renewal check
0 3 * * * certbot renew --quiet && docker-compose restart nginx
```

---

## Environment Configuration

### Backend .env

```bash
cat > /app/backend/.env << EOF
MONGO_URL="mongodb://mongodb:27017"
DB_NAME="test_database"
CORS_ORIGINS="https://datamoshtechnologies.com,https://www.datamoshtechnologies.com,https://apii.datamoshtechnologies.com"
ADMIN_API_KEY="dmosh_admin_2026_secure_key_change_me"
APP_DOMAIN=datamoshtechnologies.com
EOF
```

### Frontend .env

```bash
cat > /app/frontend/.env << EOF
REACT_APP_BACKEND_URL=https://apii.datamoshtechnologies.com
WDS_SOCKET_PORT=443
REACT_APP_DOMAIN=datamoshtechnologies.com
ENABLE_HEALTH_CHECK=false
EOF
```

---

## DNS Configuration

Update your DNS records with your domain registrar:

| Type  | Name                        | Value                    | TTL  |
|-------|-----------------------------|-----------------------|------|
| A     | @                           | YOUR_SERVER_IP        | 3600 |
| A     | www                         | YOUR_SERVER_IP        | 3600 |
| A     | apii                        | YOUR_SERVER_IP        | 3600 |
| CNAME | www                         | datamoshtechnologies.com | 3600 |
| TXT   | _acme-challenge             | Let's Encrypt token   | 600  |

---

## Deployment Steps

### 1. Clone Repository

```bash
cd /app
git clone https://github.com/enegeticitsolutions/datamosh.git .
```

### 2. Build Docker Images

```bash
docker-compose build --no-cache
```

### 3. Start Services

```bash
docker-compose up -d
```

### 4. Verify Deployment

```bash
# Check service status
docker-compose ps

# Check logs
docker-compose logs -f nginx
docker-compose logs -f backend
docker-compose logs -f frontend

# Test endpoints
curl -I https://datamoshtechnologies.com
curl -I https://apii.datamoshtechnologies.com/health
```

---

## Security Headers Explained

### Implemented Headers:

| Header | Purpose | Value |
|--------|---------|-------|
| **Strict-Transport-Security** | Force HTTPS | 31536000 seconds (1 year) |
| **X-Frame-Options** | Prevent clickjacking | SAMEORIGIN for frontend, DENY for API |
| **X-Content-Type-Options** | Prevent MIME type sniffing | nosniff |
| **X-XSS-Protection** | Enable browser XSS filter | 1; mode=block |
| **Content-Security-Policy** | Control allowed resources | Configured per service |
| **Referrer-Policy** | Control referrer information | strict-origin-when-cross-origin |
| **Permissions-Policy** | Control browser features | Disable geo, microphone, camera |

---

## Rate Limiting Configuration

- **General endpoints:** 10 requests/second per IP (burst: 20)
- **API endpoints:** 30 requests/second per IP (burst: 50)
- **Connection limit:** 10 concurrent connections per IP

---

## Monitoring and Logs

### View Nginx Logs

```bash
# Real-time access logs
docker-compose exec nginx tail -f /var/log/nginx/access.log

# Error logs
docker-compose exec nginx tail -f /var/log/nginx/error.log

# Using docker volume
tail -f /var/lib/docker/volumes/app_nginx_logs/_data/access.log
```

### Performance Monitoring

```bash
# Check container resource usage
docker stats

# Monitor logs from all services
docker-compose logs -f
```

---

## Troubleshooting

### SSL Certificate Issues

```bash
# Test SSL certificate
openssl s_client -connect api.datamoshtechnologies.com:443

# Check certificate expiry
openssl x509 -enddate -noout -in /app/ssl/fullchain.pem
```

### CORS Issues

- Update `CORS_ORIGINS` in backend .env
- Restart backend: `docker-compose restart backend`

### Performance Issues

```bash
# Check nginx configuration
docker-compose exec nginx nginx -t

# Reload nginx without downtime
docker-compose exec nginx nginx -s reload
```

### Database Issues

```bash
# Connect to MongoDB
docker-compose exec mongodb mongosh

# Check MongoDB logs
docker-compose logs mongodb
```

---

## Backup and Restore

### Backup MongoDB

```bash
docker-compose exec mongodb mongodump --out /backup
docker cp datamosh-mongodb:/backup ./mongodb_backup
```

### Restore MongoDB

```bash
docker cp ./mongodb_backup datamosh-mongodb:/backup
docker-compose exec mongodb mongorestore /backup
```

---

## Updating Services

### Update Code

```bash
cd /app
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

### Rolling Update (Zero Downtime)

```bash
# Update and rebuild
docker-compose build --no-cache backend
docker-compose up -d --scale backend=2
# Old instance terminates automatically
```

---

## Security Best Practices

✅ **Enabled:**
- TLS 1.2+ only
- Strong cipher suites (ECDHE, ChaCha20)
- HSTS preload
- Security headers
- Rate limiting
- Non-root Docker users
- SSL session caching
- OCSP stapling

✅ **Recommended Additional Steps:**
1. Enable Web Application Firewall (ModSecurity)
2. Set up DDoS protection (Cloudflare, AWS Shield)
3. Implement monitoring and alerting
4. Regular security audits
5. Keep Docker images updated
6. Use secret management (Vault, AWS Secrets Manager)

---

## Support

For issues or questions:
1. Check logs: `docker-compose logs -f`
2. Verify configuration: `docker-compose config`
3. Test connectivity: `curl -v https://api.datamoshtechnologies.com`

---

## Traditional Non-Docker Deployment

If you want to deploy without Docker, use the host-based guide in `HOST_DEPLOYMENT.md`.

This covers:
- Python virtualenv setup for backend
- PM2 process management for Uvicorn
- Yarn install and React build for frontend
- MongoDB on the host
- Nginx reverse proxy for `datamoshtechnologies.com`, `www.datamoshtechnologies.com`, and `apii.datamoshtechnologies.com`

---

**Last Updated:** June 2026  
**Version:** 1.0
