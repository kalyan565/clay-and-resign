/** @type {import('next').NextConfig} */
// Check if we're building for GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true'

const nextConfig = {
  reactStrictMode: true,
  // Enable static export for GitHub Pages
  ...(isGitHubPages ? {
    output: 'export',
    basePath: '/clay-and-resign',
    assetPrefix: '/clay-and-resign',
    trailingSlash: true,
  } : {}),
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

