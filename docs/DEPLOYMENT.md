# Deployment Guide

This guide explains how to deploy all micro frontend applications using GitHub Actions.

## Overview

This monorepo contains multiple independent applications that can be deployed in different ways:

- **Authentication** - `/authentication`
- **Landing** - `/landing`
- **User Profile** - `/user-profile`
- **Dashboard** - `/dashboard`

## Deployment Options

### Option 1: GitHub Pages (Free)

GitHub Pages is free for public repositories and allows deploying static sites directly from your repository.

#### Setup

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Use the workflow**: The `.github/workflows/deploy.yml` workflow will automatically:
   - Build all apps
   - Deploy them to GitHub Pages
   - Each app will be available at `https://yourusername.github.io/repo-name/app-name/`

#### Configuration

The workflow is already configured. Just push to `main` or `master` branch and it will deploy automatically.

**URLs:**
- `https://yourusername.github.io/repo-name/` → Redirects to landing
- `https://yourusername.github.io/repo-name/authentication/`
- `https://yourusername.github.io/repo-name/landing/`
- `https://yourusername.github.io/repo-name/user-profile/`
- `https://yourusername.github.io/repo-name/dashboard/`

### Option 2: Netlify (Free - Recommended)

Netlify offers a free tier with generous limits and is ideal for deploying multiple apps under different paths.

#### Setup - Unified Deployment (Single Site)

This is the recommended approach: deploy all apps to a single Netlify site with different paths.

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Create a new site** in Netlify dashboard

3. **Get your credentials**:
   - Go to User settings → Applications → New access token
   - Create a token and save it
   - Get your Site ID from Site settings → General

4. **Add GitHub Secrets**:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `NETLIFY_AUTH_TOKEN`: Your Netlify access token
     - `NETLIFY_SITE_ID`: Your Netlify site ID

5. **Enable the workflow**: The `.github/workflows/deploy-unified-netlify.yml` workflow will automatically deploy all apps to a single Netlify site.

**URLs:**
- `https://your-site.netlify.app/` → Redirects to landing
- `https://your-site.netlify.app/authentication/`
- `https://your-site.netlify.app/landing/`
- `https://your-site.netlify.app/user-profile/`
- `https://your-site.netlify.app/dashboard/`

#### Setup - Separate Sites (Multiple Deployments)

If you prefer to deploy each app as a separate Netlify site:

1. **Create 4 Netlify sites** (one for each app)

2. **Get Site IDs** for each site

3. **Add GitHub Secrets**:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify access token
   - `NETLIFY_SITE_ID_AUTHENTICATION`: Authentication site ID
   - `NETLIFY_SITE_ID_LANDING`: Landing site ID
   - `NETLIFY_SITE_ID_USER_PROFILE`: User Profile site ID
   - `NETLIFY_SITE_ID_DASHBOARD`: Dashboard site ID

4. **Use the workflow**: `.github/workflows/deploy-netlify.yml` will deploy each app to its own site.

### Option 3: Vercel (Free)

Vercel is similar to Netlify and also offers a free tier.

#### Setup

1. **Install Vercel CLI** or use Vercel dashboard

2. **Create a `vercel.json`** configuration file (see example below)

3. **Deploy using Vercel GitHub integration** or CLI

Example `vercel.json`:

```json
{
  "buildCommand": "pnpm install && pnpm build",
  "outputDirectory": "netlify-dist",
  "rewrites": [
    { "source": "/authentication/:path*", "destination": "/authentication/index.html" },
    { "source": "/landing/:path*", "destination": "/landing/index.html" },
    { "source": "/user-profile/:path*", "destination": "/user-profile/index.html" },
    { "source": "/dashboard/:path*", "destination": "/dashboard/index.html" },
    { "source": "/", "destination": "/landing/" }
  ]
}
```

## GitHub Actions Workflows

### Available Workflows

1. **`.github/workflows/deploy.yml`**
   - Deploys to GitHub Pages
   - Builds all apps and deploys them under different paths
   - **Free** for public repositories

2. **`.github/workflows/deploy-unified-netlify.yml`** (Recommended)
   - Deploys all apps to a single Netlify site
   - Each app accessible under its own path
   - **Free** tier available

3. **`.github/workflows/deploy-netlify.yml`**
   - Deploys each app to separate Netlify sites
   - Requires multiple Netlify sites
   - **Free** tier available (up to 100 sites)

### Manual Deployment

You can also deploy manually:

```bash
# Build all apps
pnpm build

# The built apps will be in:
# - dist/apps/authentication
# - dist/apps/landing
# - dist/apps/user-profile
# - dist/apps/dashboard
```

Then upload the contents of each `dist/apps/{app-name}` directory to your hosting provider.

## Environment Variables

For production deployments, you may need to set environment variables in your hosting provider:

- `VITE_APP_ENVIRONMENT=production`
- `VITE_API_BASE_URL=https://your-api-url.com`
- Other app-specific environment variables

## Routing Configuration

All apps are configured to work with path-based routing:

- Authentication: `/authentication/*`
- Landing: `/landing/*`
- User Profile: `/user-profile/*`
- Dashboard: `/dashboard/*`

The hosting provider needs to be configured to:
1. Serve `index.html` for all routes (SPA routing)
2. Handle the base path correctly for each app

This is already configured in:
- `netlify.toml` for Netlify
- GitHub Pages workflow handles it automatically
- Vercel requires `vercel.json` (see example above)

## Troubleshooting

### Apps not loading correctly

1. **Check base path**: Ensure the hosting provider is configured to serve from the correct base path
2. **Check routing**: Verify that all routes serve `index.html` (SPA routing)
3. **Check build output**: Verify that `dist/apps/{app-name}` contains the built files

### Build failures

1. **Check Node version**: Ensure Node.js 20+ is used
2. **Check pnpm version**: Ensure pnpm 8+ is installed
3. **Check dependencies**: Run `pnpm install` locally to verify

### GitHub Actions not running

1. **Check branch**: Workflows only run on `main` or `master` by default
2. **Check permissions**: Ensure GitHub Actions is enabled in repository settings
3. **Check secrets**: Verify all required secrets are set (for Netlify deployment)

## Cost Comparison

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| GitHub Pages | ✅ Unlimited (public repos) | Simple static sites |
| Netlify | ✅ 100GB bandwidth/month | Production apps, better DX |
| Vercel | ✅ 100GB bandwidth/month | Production apps, Next.js focus |

## Recommendations

1. **For development/testing**: Use GitHub Pages (free, simple)
2. **For production**: Use Netlify unified deployment (better performance, features)
3. **For separate domains**: Use Netlify separate sites workflow

## Next Steps

1. Choose your deployment option
2. Set up the required secrets (if using Netlify)
3. Push to `main` branch
4. Monitor the GitHub Actions workflow
5. Verify deployment URLs
