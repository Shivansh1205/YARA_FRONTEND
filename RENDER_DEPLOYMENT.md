# 🚀 YARA Frontend - Render Deployment Guide

## 📦 What Was Created

1. **Dockerfile** - Multi-stage build for optimized production image
2. **nginx.conf** - Nginx configuration for serving the React app
3. **.dockerignore** - Excludes unnecessary files from Docker build

---

## 🐳 Dockerfile Explanation

### Two-Stage Build Process

**Stage 1: Builder**
- Uses Node.js 18 Alpine (lightweight)
- Installs dependencies with `npm ci` (faster, more reliable)
- Builds the production bundle
- Creates optimized static files in `dist/`

**Stage 2: Production**
- Uses Nginx Alpine (very lightweight ~23MB)
- Copies only the built files from Stage 1
- Serves static files efficiently
- Exposes port 80

### Benefits
- ✅ Small image size (~40MB vs 1GB+)
- ✅ Fast builds
- ✅ Secure (no Node.js in production)
- ✅ Optimized for static file serving

---

## 🚀 Deploy to Render

### Option 1: Render Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Docker configuration for deployment"
   git push origin main
   ```

2. **Create New Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `YARA_FRONTEND` repo

3. **Configure Service**
   - **Name**: `yara-frontend` (or your choice)
   - **Environment**: `Docker`
   - **Region**: Select closest to you
   - **Branch**: `main`
   - **Dockerfile Path**: `Dockerfile` (default)
   - **Instance Type**: `Free` (or paid for better performance)

4. **Environment Variables** (Optional)
   - Add any environment variables if needed
   - For this app, none are required (backend URL is hardcoded)

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - You'll get a URL like: `https://yara-frontend.onrender.com`

### Option 2: Render Blueprint (Advanced)

Create `render.yaml`:
```yaml
services:
  - type: web
    name: yara-frontend
    env: docker
    plan: free
    healthCheckPath: /
    envVars:
      - key: NODE_ENV
        value: production
```

---

## 🧪 Test Docker Build Locally

### Build the Image
```bash
docker build -t yara-frontend .
```

### Run the Container
```bash
docker run -p 8080:80 yara-frontend
```

### Test in Browser
Open http://localhost:8080

### Stop Container
```bash
docker ps  # Find container ID
docker stop <container-id>
```

---

## 📊 Build Optimization

Current build creates:
- **Builder stage**: ~1.2GB (discarded)
- **Final image**: ~40MB
- **Build time**: ~2-3 minutes

### Files included in final image:
```
/usr/share/nginx/html/
├── index.html (0.47 kB)
├── assets/
│   ├── index-BVgJAC2s.css (24.25 kB)
│   └── index-BqrVSQgN.js (344.55 kB)
```

---

## 🔧 Nginx Configuration Features

### React Router Support
- All routes serve `index.html`
- Client-side routing works correctly

### Performance
- Gzip compression enabled
- Static assets cached for 1 year
- HTML not cached (always fresh)

### Security Headers
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: enabled

---

## 🌐 Custom Domain (Optional)

### On Render
1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain (e.g., `yara.yourdomain.com`)
4. Update DNS records as instructed
5. Render handles SSL automatically (free)

### DNS Configuration
```
Type: CNAME
Name: yara (or @)
Value: yara-frontend.onrender.com
```

---

## 🔄 Automatic Deployments

Render automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Render will automatically:
# 1. Detect changes
# 2. Build Docker image
# 3. Deploy new version
# 4. Zero-downtime deployment
```

---

## 📈 Monitoring

### Render Dashboard Shows:
- ✅ Build logs
- ✅ Deploy logs
- ✅ Runtime logs
- ✅ Metrics (CPU, Memory, Requests)
- ✅ Health checks

### View Logs
```bash
# From Render dashboard
# Click on your service → "Logs" tab
```

---

## 🐛 Troubleshooting

### Build Fails

**Check package.json scripts:**
```json
{
  "scripts": {
    "build": "vite build"  // Must exist
  }
}
```

**Check build output:**
- Should create `dist/` folder
- Should contain `index.html` and `assets/`

### App Not Loading

**Check nginx logs:**
- Go to Render dashboard → Logs
- Look for 404 or 500 errors

**Verify files exist:**
```bash
# In Render shell (if available)
ls -la /usr/share/nginx/html/
```

### API Connection Issues

**Backend URL is correct:**
```typescript
// In src/api.ts
export const API_BASE_URL = 'https://yara-0ecr.onrender.com';
```

**CORS is enabled on backend**

---

## 💰 Pricing

### Render Free Tier
- ✅ 750 hours/month (always on)
- ✅ Auto-sleep after 15 min inactivity
- ✅ Wake on request (~30s cold start)
- ✅ Custom domain support
- ✅ Free SSL
- ✅ GitHub auto-deploy

### Paid Plans (Optional)
- **Starter ($7/mo)**: No sleep, faster
- **Standard ($25/mo)**: More resources
- **Pro ($85/mo)**: High performance

---

## 🎯 Expected URLs

After deployment, you'll have:

- **Frontend**: `https://yara-frontend.onrender.com`
- **Backend** (already deployed): `https://yara-0ecr.onrender.com`

Both should communicate seamlessly! 🎉

---

## ✅ Deployment Checklist

- [x] Dockerfile created
- [x] nginx.conf created
- [x] .dockerignore created
- [ ] Push to GitHub
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Configure web service
- [ ] Deploy!
- [ ] Test the live URL
- [ ] (Optional) Add custom domain

---

## 🚀 Quick Deploy Commands

```bash
# 1. Commit Docker files
git add Dockerfile nginx.conf .dockerignore
git commit -m "Add Docker deployment configuration"

# 2. Push to GitHub
git push origin main

# 3. Go to Render and create web service
# (Use the UI - it's easier!)

# 4. Wait for deployment (~3-5 minutes)

# 5. Visit your URL!
# https://yara-frontend.onrender.com
```

---

## 🎉 You're Ready!

Your YARA frontend is ready for Render deployment. The Docker setup is:
- ✅ Production-optimized
- ✅ Secure
- ✅ Fast
- ✅ Auto-scaling ready

**Next Step**: Push to GitHub and deploy on Render! 🚀

