# Soul Link - Hosting Guide

## 🚀 Hosting Options Overview

Your Soul Link application consists of:

- React frontend (built with Vite)
- Express.js backend server
- API endpoints for chat and booking
- Static HTML pages (forum, auth, booking)
- Database (Supabase - already hosted)

## Option 1: Vercel (Recommended) ⭐

**Best for**: Full-stack applications with serverless functions

### Steps:

1. **Prepare for Vercel**

   ```bash
   # Install Vercel CLI
   npm install -g vercel
   ```

2. **Create vercel.json**

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       }
     ],
     "functions": {
       "api/chat.js": {
         "runtime": "nodejs18.x"
       },
       "api/book-appointment.js": {
         "runtime": "nodejs18.x"
       }
     },
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/api/$1"
       },
       {
         "src": "/(.*)",
         "dest": "/dist/$1"
       }
     ]
   }
   ```

3. **Update API handlers for Vercel**

   - Your API files are already compatible!

4. **Deploy**

   ```bash
   # Login to Vercel
   vercel login

   # Deploy
   vercel --prod
   ```

5. **Set Environment Variables**
   - Go to Vercel dashboard
   - Add: `GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`, etc.

## Option 2: Netlify

**Best for**: Static sites with serverless functions

### Steps:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Create netlify.toml**

   ```toml
   [build]
     publish = "dist"
     command = "npm run build"

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Move API functions**

   ```bash
   mkdir netlify/functions
   cp api/*.js netlify/functions/
   ```

4. **Deploy via Netlify CLI or drag & drop**

## Option 3: Railway (Full-Stack Server)

**Best for**: Applications that need a persistent server

### Steps:

1. **Create railway.json**

   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

2. **Update package.json**

   ```json
   {
     "scripts": {
       "start": "npm run build && node server.js"
     }
   }
   ```

3. **Deploy**
   - Connect GitHub repo to Railway
   - Set environment variables
   - Deploy automatically

## Option 4: Render

**Best for**: Simple full-stack hosting

### Steps:

1. **Create render.yaml**

   ```yaml
   services:
     - type: web
       name: soul-link
       env: node
       buildCommand: npm install && npm run build
       startCommand: node server.js
       envVars:
         - key: NODE_ENV
           value: production
   ```

2. **Connect GitHub and deploy**

## Option 5: Traditional VPS (DigitalOcean, Linode, etc.)

### Steps:

1. **Server Setup**

   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2 for process management
   npm install -g pm2

   # Install Nginx
   sudo apt install nginx
   ```

2. **Deploy Application**

   ```bash
   # Clone your repository
   git clone <your-repo-url>
   cd soul-link

   # Install dependencies
   npm install

   # Build the application
   npm run build

   # Start with PM2
   pm2 start server.js --name soul-link
   pm2 startup
   pm2 save
   ```

3. **Configure Nginx**

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables

Create these in your hosting platform:

```
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=https://qvocyxwvlazbvpdsppsa.supabase.co
SUPABASE_KEY=your_supabase_anon_key
GOOGLE_CREDENTIALS={"type":"service_account",...}
SPREADSHEET_ID=your_sheets_id
NODE_ENV=production
```

### 2. Update API URLs

If using different domains for frontend/backend:

```javascript
// In script.js, update API calls
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-api-domain.com'
  : 'http://localhost:3001';

fetch(`${API_BASE_URL}/api/chat`, {...})
```

### 3. Database Setup

Ensure your Supabase tables exist:

```sql
-- Run these in Supabase SQL editor
CREATE TABLE users (...);
CREATE TABLE posts (...);
CREATE TABLE replies (...);
CREATE TABLE appointments (...);
```

### 4. Test Build Locally

```bash
npm run build
npm run server
# Test at http://localhost:3001
```

## 🚀 Quick Deploy Commands

### Vercel (Fastest)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Railway

```bash
# Connect GitHub repo at railway.app
# Auto-deploys on push
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit API keys
2. **CORS**: Configure properly for your domain
3. **HTTPS**: Enable SSL certificates
4. **Database**: Use RLS policies in Supabase
5. **Rate Limiting**: Add to API endpoints

## 📊 Recommended Hosting by Use Case

- **Personal Project**: Vercel (free tier)
- **Small Business**: Railway ($5/month)
- **Enterprise**: VPS with custom setup
- **Static + Functions**: Netlify
- **Need Database Control**: VPS with self-hosted DB

## 🆘 Troubleshooting

### Common Issues:

1. **Build Fails**: Check Node.js version (use 18+)
2. **API 404**: Verify API routes configuration
3. **CORS Errors**: Update CORS settings for your domain
4. **Database Connection**: Check Supabase credentials
5. **Large Bundle**: Implement code splitting

### Debug Commands:

```bash
# Check build
npm run build

# Test server locally
npm run server

# Check logs (Railway/Render)
# View in dashboard

# Vercel logs
vercel logs
```

Choose the option that best fits your needs and budget! Vercel is recommended for most use cases due to its simplicity and excellent developer experience.
