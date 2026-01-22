#!/bin/bash
# Script to prepare deployment structure for all apps
# This creates a unified directory structure ready for deployment

set -e

echo "🚀 Preparing deployment structure..."

# Create deployment directory
DEPLOY_DIR="deployment"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Build all apps
echo "📦 Building all apps..."
pnpm build

# Copy each app to its respective path
echo "📋 Copying apps to deployment directory..."

cp -r dist/apps/authentication "$DEPLOY_DIR/authentication"
cp -r dist/apps/landing "$DEPLOY_DIR/landing"
cp -r dist/apps/user-profile "$DEPLOY_DIR/user-profile"
cp -r dist/apps/dashboard "$DEPLOY_DIR/dashboard"

# Create root index.html that redirects to landing
cat > "$DEPLOY_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tucu UI - Micro Frontends</title>
  <meta http-equiv="refresh" content="0; url=/landing/">
  <link rel="canonical" href="/landing/">
</head>
<body>
  <p>Redirecting to <a href="/landing/">landing page</a>...</p>
</body>
</html>
EOF

echo "✅ Deployment structure prepared in: $DEPLOY_DIR"
echo ""
echo "📁 Directory structure:"
echo "  $DEPLOY_DIR/"
echo "    ├── index.html (redirects to /landing/)"
echo "    ├── authentication/"
echo "    ├── landing/"
echo "    ├── user-profile/"
echo "    └── dashboard/"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "For GitHub Pages: Upload contents of '$DEPLOY_DIR' to gh-pages branch"
echo "For Netlify: Set publish directory to '$DEPLOY_DIR'"
echo "For Vercel: Set output directory to '$DEPLOY_DIR'"
