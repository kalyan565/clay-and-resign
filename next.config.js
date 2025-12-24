/** @type {import('next').NextConfig} */
// Check if we're building for GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true'
const basePath = isGitHubPages ? '/clay-and-resign' : ''

const nextConfig = {
  reactStrictMode: true,
  // Enable static export for GitHub Pages
  ...(isGitHubPages ? {
    output: 'export',
    basePath: basePath,
    assetPrefix: basePath,
    trailingSlash: true,
  } : {}),
  images: {
    unoptimized: true,
  },
  // Set environment variable for client-side use
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

module.exports = nextConfig

