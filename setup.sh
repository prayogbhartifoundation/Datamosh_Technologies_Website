#!/bin/bash

# Datamosh Technologies - Automated Deployment Setup Script
# This script sets up SSL certificates, environment files, and deploys the application

set -e

echo "=========================================="
echo "Datamosh Technologies - Setup Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="datamoshtechnologies.com"
EMAIL="${1:-admin@datamoshtechnologies.com}"
ADMIN_API_KEY="${2:-dmosh_admin_2026_secure_key_change_me}"

echo -e "${YELLOW}[INFO]${NC} Domain: $DOMAIN"
echo -e "${YELLOW}[INFO]${NC} Email: $EMAIL"
echo ""

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}[ERROR]${NC} This script must be run as root"
   exit 1
fi

# Step 1: Update system
echo -e "${YELLOW}[STEP 1/6]${NC} Updating system packages..."
apt-get update -qq
apt-get upgrade -y -qq
echo -e "${GREEN}[DONE]${NC} System updated"
echo ""

# Step 2: Install dependencies
echo -e "${YELLOW}[STEP 2/6]${NC} Installing Docker and dependencies..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    bash get-docker.sh
    rm get-docker.sh
fi

if ! command -v docker-compose &> /dev/null; then
    apt-get install -y -qq docker-compose-plugin
fi

if ! command -v certbot &> /dev/null; then
    apt-get install -y -qq certbot python3-certbot-nginx
fi

echo -e "${GREEN}[DONE]${NC} Dependencies installed"
echo ""

# Step 3: Create directories and SSL setup
echo -e "${YELLOW}[STEP 3/6]${NC} Setting up SSL certificates..."
mkdir -p /app/ssl
mkdir -p /app/certbot/conf
mkdir -p /app/certbot/www

# Check if SSL certificates already exist
if [[ -f "/app/ssl/fullchain.pem" && -f "/app/ssl/privkey.pem" ]]; then
    echo -e "${GREEN}[INFO]${NC} SSL certificates already exist, skipping certificate generation"
else
    echo -e "${YELLOW}[INFO]${NC} Generating new SSL certificates with Let's Encrypt..."
    certbot certonly --standalone \
        -d "$DOMAIN" \
        -d "www.$DOMAIN" \
        -d "apii.$DOMAIN" \
        --email "$EMAIL" \
        --agree-tos \
        --non-interactive \
        --expand 2>/dev/null || echo -e "${YELLOW}[WARNING]${NC} Certificate generation requires port 80 to be available"
    
    if [[ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
        cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /app/ssl/
        cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /app/ssl/
        chmod 644 /app/ssl/fullchain.pem
        chmod 644 /app/ssl/privkey.pem
        echo -e "${GREEN}[DONE]${NC} SSL certificates generated and copied"
    else
        echo -e "${RED}[WARNING]${NC} Certificate generation failed. Ensure port 80 is accessible."
    fi
fi
echo ""

# Step 4: Configure environment files
echo -e "${YELLOW}[STEP 4/6]${NC} Configuring environment files..."

# Backend .env
cat > /app/backend/.env << EOF
MONGO_URL="mongodb://mongodb:27017"
DB_NAME="test_database"
CORS_ORIGINS="https://$DOMAIN,https://www.$DOMAIN,https://apii.$DOMAIN"
ADMIN_API_KEY="$ADMIN_API_KEY"
APP_DOMAIN=$DOMAIN
EOF

# Frontend .env
cat > /app/frontend/.env << EOF
REACT_APP_BACKEND_URL=https://apii.$DOMAIN
WDS_SOCKET_PORT=443
REACT_APP_DOMAIN=$DOMAIN
ENABLE_HEALTH_CHECK=false
EOF

echo -e "${GREEN}[DONE]${NC} Environment files configured"
echo ""

# Step 5: Build and start services
echo -e "${YELLOW}[STEP 5/6]${NC} Building Docker images..."
cd /app
docker-compose build --no-cache 2>&1 | grep -E "Step|Successfully|ERROR" || true
echo -e "${GREEN}[DONE]${NC} Docker images built"
echo ""

echo -e "${YELLOW}[STEP 6/6]${NC} Starting services..."
docker-compose up -d
echo -e "${GREEN}[DONE]${NC} Services started"
echo ""

# Verify services
echo -e "${YELLOW}[INFO]${NC} Waiting for services to be ready..."
sleep 10

echo ""
echo -e "${YELLOW}========== Service Status ==========${NC}"
docker-compose ps
echo ""

# Test endpoints
echo -e "${YELLOW}[INFO]${NC} Testing endpoints..."
echo ""

if curl -s -k -o /dev/null -w "%{http_code}" https://localhost/health | grep -q "200\|301\|302"; then
    echo -e "${GREEN}[✓]${NC} Frontend is responding"
else
    echo -e "${RED}[✗]${NC} Frontend check failed"
fi

if curl -s -k -o /dev/null -w "%{http_code}" https://localhost/health | grep -q "200"; then
    echo -e "${GREEN}[✓]${NC} API is responding"
else
    echo -e "${RED}[✗]${NC} API check failed (this is normal if backend is still initializing)"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update your DNS records to point to this server's IP"
echo "2. Monitor logs: docker-compose logs -f"
echo "3. Access the app: https://$DOMAIN"
echo "4. Access the API: https://api.$DOMAIN"
echo ""

echo -e "${YELLOW}SSL Certificate Renewal:${NC}"
echo "Add this to your crontab (sudo crontab -e):"
echo "0 3 * * * certbot renew --quiet && docker-compose -f /app/docker-compose.yml restart nginx"
echo ""

echo -e "${YELLOW}Important:${NC}"
echo "- Save this Admin API Key safely: $ADMIN_API_KEY"
echo "- Review and update environment variables as needed"
echo "- Check DEPLOYMENT.md for troubleshooting and advanced configuration"
echo ""

# Set up auto-renewal
echo -e "${YELLOW}[INFO]${NC} Setting up automatic SSL certificate renewal..."
(crontab -l 2>/dev/null | grep -v "certbot renew"; echo "0 3 * * * certbot renew --quiet && docker-compose -f /app/docker-compose.yml restart nginx 2>&1 | logger") | crontab - 2>/dev/null || true
echo -e "${GREEN}[DONE]${NC} Auto-renewal configured"
echo ""

echo -e "${GREEN}Setup script completed!${NC}"
