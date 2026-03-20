# SEITYL Production Deployment

## Option 3: Direct Production Deploy (Recommended)

Deploy directly on your production server using the pre-built Docker image.

---

## Prerequisites

### On Production Server:

1. **Docker installed**
2. **Registry configured** (if using private registry):
   ```bash
   sudo nano /etc/docker/daemon.json
   ```
   Add:
   ```json
   {
     "insecure-registries": ["192.168.1.201:5000"]
   }
   ```
   Then:
   ```bash
   sudo systemctl restart docker
   ```

3. **Cloudflare Tunnel Token** (optional, for tunnel setup)

---

## Deployment Steps

### Step 1: Pull Image from Registry

```bash
docker pull 192.168.1.201:5000/seityl-website:latest
```

### Step 2: Deploy Website Only

Simple deployment with just nginx:

```bash
docker run -d \
  --name seityl-website \
  --restart unless-stopped \
  -p 80:80 \
  192.168.1.201:5000/seityl-website:latest
```

**Verify:**
```bash
curl http://localhost
docker logs seityl-website
```

---

### Step 3: Deploy with Cloudflare Tunnel (Full Stack)

Copy the production compose file:

```bash
# Create project directory
mkdir -p ~/seityl && cd ~/seityl

# Copy files (from your dev machine or git)
# You need: docker-compose.prod.yml and .env

# Create environment file
cat > .env << 'EOF'
TUNNEL_TOKEN=your_cloudflare_tunnel_token_here
EOF

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

**Verify services:**
```bash
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f
```

---

## Directory Structure on Production Server

```
~/seityl/
├── docker-compose.prod.yml    # Production compose file
├── .env                       # Environment variables (not in git)
└── DEPLOY.md                  # This file
```

---

## Useful Commands

### Update to New Version

```bash
# Pull latest image
docker pull 192.168.1.201:5000/seityl-website:latest

# Restart with new image
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

### View Logs

```bash
# Website logs
docker logs -f seityl-website

# Tunnel logs
docker logs -f seityl-tunnel

# All services
docker-compose -f docker-compose.prod.yml logs -f
```

### Stop/Start Services

```bash
# Stop
docker-compose -f docker-compose.prod.yml down

# Start
docker-compose -f docker-compose.prod.yml up -d

# Restart
docker-compose -f docker-compose.prod.yml restart
```

### Health Check

```bash
# Local test
curl -s -o /dev/null -w "%{http_code}" http://localhost

# Should return: 200

# Check container health
docker ps | grep seityl
```

---

## Cloudflare Tunnel Setup

1. **Install cloudflared locally:**
   ```bash
   # macOS
   brew install cloudflared
   
   # Linux
   wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
   sudo dpkg -i cloudflared-linux-amd64.deb
   ```

2. **Authenticate:**
   ```bash
   cloudflared tunnel login
   ```

3. **Create tunnel:**
   ```bash
   cloudflared tunnel create seityl
   ```

4. **Get token:**
   ```bash
   cloudflared tunnel token seityl
   ```

5. **Copy token to `.env` file**

6. **Configure DNS in Cloudflare dashboard:**
   - Create CNAME: `seityl.com` → `<tunnel-id>.cfargotunnel.com`

---

## Security Considerations

### Registry Authentication (if needed)

```bash
# Login to private registry
docker login 192.168.1.201:5000

# Or use .docker/config.json
```

### SSL/HTTPS

With Cloudflare Tunnel:
- SSL is handled automatically by Cloudflare
- No certificate management needed on server

Without Cloudflare (local SSL):
```yaml
# Add to docker-compose.prod.yml
services:
  website:
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    environment:
      - NGINX_ENABLE_SSL=true
```

---

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs seityl-website

# Check port conflict
sudo netstat -tlnp | grep :80
```

### Tunnel not connecting
```bash
# Verify token
docker logs seityl-tunnel

# Test tunnel locally
cloudflared tunnel --config ~/.cloudflared/config.yml run
```

### Image pull fails
```bash
# Test registry connectivity
curl http://192.168.1.201:5000/v2/_catalog

# Verify insecure registry config
cat /etc/docker/daemon.json
```

---

## Rollback

```bash
# List previous images
docker images 192.168.1.201:5000/seityl-website

# Run specific version
docker stop seityl-website
docker rm seityl-website
docker run -d \
  --name seityl-website \
  --restart unless-stopped \
  -p 80:80 \
  192.168.1.201:5000/seityl-website:PREVIOUS_TAG
```
