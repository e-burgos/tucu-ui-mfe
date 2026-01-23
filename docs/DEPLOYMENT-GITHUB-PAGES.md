# GitHub Pages Deployment Guide

This guide explains how to deploy all micro frontend applications to GitHub Pages using GitHub Actions.

## Overview

This monorepo contains multiple independent applications that are deployed to GitHub Pages:

- **Authentication** - `/repo-name/authentication` (e.g., `/tucu-ui-mfe/authentication`)
- **Landing** - `/repo-name/landing` (e.g., `/tucu-ui-mfe/landing`)
- **User Profile** - `/repo-name/user-profile` (e.g., `/tucu-ui-mfe/user-profile`)
- **Dashboard** - `/repo-name/dashboard` (e.g., `/tucu-ui-mfe/dashboard`)
- **Dev Server** - `/repo-name/dev-server` (e.g., `/tucu-ui-mfe/dev-server`)

> **Note**: In GitHub Pages, all paths include the repository name. For local development, paths are `/authentication`, `/landing`, etc.

## GitHub Pages Deployment

GitHub Pages is free for public repositories and allows deploying static sites directly from your repository.

#### Setup

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - **Important**: Leave "Custom domain" field blank (do not enter `username.github.io`)

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
- `https://yourusername.github.io/repo-name/dev-server/`

#### GitHub Pages Implementation Details

The following configuration was implemented to ensure proper deployment to GitHub Pages:

##### 1. Base Path Configuration

**Problem**: GitHub Pages serves from `https://username.github.io/repo-name/`, requiring all apps to include the repository name in their base paths.

**Solution**: 
- Added `VITE_BASE_PATH` environment variable set to `/${{ github.event.repository.name }}` (e.g., `/tucu-ui-mfe`)
- Modified `tools/apps-config/vite-base-config.ts` to calculate base path as:
  ```typescript
  const basePath = process.env.VITE_BASE_PATH 
    ? `${process.env.VITE_BASE_PATH}/${name}`  // /tucu-ui-mfe/landing
    : `/${name}`;  // /landing (local dev)
  ```
- Updated `html-transform` plugin to use the calculated `basePath` instead of hardcoded `/${name}`

##### 2. Environment Variables for Routing

**Problem**: Apps need to know their full URLs and paths for inter-app navigation and routing.

**Solution**: Added comprehensive environment variables in the workflow:

**APP_URLS** (Full URLs with protocol):
- `VITE_APP_AUTHENTICATION_URL`: `https://username.github.io/repo-name/authentication`
- `VITE_APP_LANDING_URL`: `https://username.github.io/repo-name/landing`
- `VITE_APP_USER_PROFILE_URL`: `https://username.github.io/repo-name/user-profile`
- `VITE_APP_DASHBOARD_URL`: `https://username.github.io/repo-name/dashboard`
- `VITE_APP_DEV_SERVER_URL`: `https://username.github.io/repo-name`

**APP_PATHS** (Relative paths for routing):
- `VITE_APP_AUTHENTICATION_PATH`: `/repo-name/authentication`
- `VITE_APP_LANDING_PATH`: `/repo-name/landing`
- `VITE_APP_USER_PROFILE_PATH`: `/repo-name/user-profile`
- `VITE_APP_DASHBOARD_PATH`: `/repo-name/dashboard`
- `VITE_APP_DEV_SERVER_PATH`: `/repo-name`

These are used by `libs/utils/src/routes.ts` to provide `APP_PATHS` and `APP_URLS` constants.

##### 3. Navigation Function Fix

**Problem**: `navigateBetweenApps()` was treating URLs without protocol as relative paths, causing incorrect redirects like `https://e-burgos.github.io/e-burgos.github.io/tucu-ui-mfe/app-name`.

**Solution**: Updated `libs/utils/src/functions.ts`:
```typescript
export const navigateBetweenApps = (url: string, target: '_self' | '_blank' = '_self') => {
  if (target === '_blank') {
    window.open(url, target);
    return;
  }
  
  // Handle both absolute URLs and relative paths
  if (url.startsWith('http://') || url.startsWith('https://')) {
    window.location.href = url;  // Absolute URL
  } else {
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;
    window.location.href = normalizedPath;  // Relative path
  }
};
```

##### 4. Artifact Handling

**Problem**: GitHub Actions flattens artifact directory structure when downloading.

**Solution**: 
- Upload entire `dist/apps` directory as single artifact
- Download to `path: dist` (not `dist/apps`)
- Artifacts are flattened: `dist/apps/authentication` → `dist/authentication`
- Updated workflow to copy from `dist/authentication` instead of `dist/apps/authentication`

##### 5. SPA Routing Support

**Problem**: GitHub Pages doesn't natively support SPA routing (direct navigation to routes like `/repo-name/landing/page-1`).

**Solution**:
- Created `_site/404.html` with JavaScript fallback that:
  - Detects the repository name from the path
  - Redirects to the appropriate app based on path segments
  - Handles deep links within apps
- Added `.nojekyll` file to disable Jekyll processing (required for SPA routing)

##### 6. Dev-Server Configuration

**Problem**: Dev-server needed to work in both local development and GitHub Pages deployment.

**Solution**:
- Updated `tools/dev-server/vite.config.ts` to:
  - Calculate base path from `VITE_BASE_PATH` environment variable
  - Use `/repo-name` for GitHub Pages, `/` for local dev
- Updated `tools/dev-server/index.html`:
  - Added placeholders `%APP_*_URL%` for all app links
  - Updated `html-transform` plugin to replace placeholders with actual URLs from environment variables
  - All anchor tags and redirect scripts now use environment variables

##### 7. Root Redirect

**Solution**: Created `_site/index.html` that redirects root requests (`/repo-name/`) to landing app (`/repo-name/landing/`).

##### Key Files Modified

1. **`.github/workflows/deploy.yml`**:
   - Added all environment variables for APP_URLS and APP_PATHS
   - Fixed artifact download paths
   - Added verification steps
   - Created 404.html and index.html with proper routing

2. **`tools/apps-config/vite-base-config.ts`**:
   - Updated base path calculation to use `VITE_BASE_PATH`
   - Fixed `html-transform` plugin to use calculated `basePath`

3. **`libs/utils/src/functions.ts`**:
   - Improved `navigateBetweenApps` to handle absolute and relative URLs

4. **`libs/utils/src/routes.ts`**:
   - Uses environment variables for `APP_PATHS` and `APP_URLS`

5. **`tools/dev-server/vite.config.ts`**:
   - Added base path configuration
   - Added HTML transform plugin for URL placeholders

6. **`tools/dev-server/index.html`**:
   - Replaced hardcoded paths with environment variable placeholders

## GitHub Actions Workflow

### Workflow Configuration

The `.github/workflows/deploy.yml` workflow handles the complete deployment process:

1. **Build Job**: Builds all apps with the correct environment variables
2. **Deploy Job**: Prepares the deployment structure and deploys to GitHub Pages

**Workflow Features:**
- Builds all apps (authentication, landing, user-profile, dashboard, dev-server)
- Configures environment variables for GitHub Pages paths
- Handles artifact upload/download with proper structure
- Creates SPA routing support files (404.html, index.html)
- Deploys to GitHub Pages automatically

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

## Routing Configuration

All apps are configured to work with path-based routing:

- Authentication: `/repo-name/authentication/*`
- Landing: `/repo-name/landing/*`
- User Profile: `/repo-name/user-profile/*`
- Dashboard: `/repo-name/dashboard/*`
- Dev Server: `/repo-name/dev-server/*`

GitHub Pages is configured to:
1. Serve `index.html` for all routes (SPA routing via 404.html fallback)
2. Handle the base path correctly for each app (includes repository name)
3. Redirect root requests to landing app

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
3. **Check GitHub Pages settings**: Ensure "Source: GitHub Actions" is selected

## Environment Variables

The workflow automatically sets the following environment variables during build:

**Required for GitHub Pages:**
- `VITE_BASE_PATH`: Repository subdirectory path (e.g., `/tucu-ui-mfe`)
- `VITE_APP_*_URL`: Full URLs for each app (with `https://` protocol)
- `VITE_APP_*_PATH`: Relative paths for routing (includes repository name)

**Optional:**
- `VITE_API_BASE_URL`: API endpoint URL (can be set as GitHub secret)
- `VITE_APP_ENVIRONMENT`: Set to `production` automatically

## Next Steps

1. Enable GitHub Pages in repository settings (Source: GitHub Actions)
2. Push to `main` branch
3. Monitor the GitHub Actions workflow
4. Verify deployment URLs after workflow completes
