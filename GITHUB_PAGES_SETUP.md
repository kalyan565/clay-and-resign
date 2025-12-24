# GitHub Pages Setup Instructions

## Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/kalyan565/clay-and-resign
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Save the settings

## Step 2: Wait for Deployment

1. After pushing to the `main` branch, GitHub Actions will automatically:
   - Build your Next.js site
   - Deploy it to GitHub Pages
2. You can check the deployment status in the **Actions** tab
3. The first deployment may take 5-10 minutes

## Step 3: Access Your Website

Once deployed, your website will be available at:
**https://kalyan565.github.io/clay-and-resign/**

## Important Notes

- The site uses static export, so API routes won't work
- WhatsApp integration works client-side (opens WhatsApp directly)
- All images are unoptimized for static hosting
- The site automatically rebuilds when you push to `main` branch

## Troubleshooting

If the site doesn't load:
1. Check the **Actions** tab for build errors
2. Make sure GitHub Pages is enabled in Settings
3. Wait a few minutes for the first deployment
4. Clear your browser cache and try again

## Manual Deployment (Alternative)

If GitHub Actions doesn't work, you can manually deploy:

```bash
npm run build
# The 'out' folder contains the static files
# Upload the contents of 'out' folder to GitHub Pages
```

