/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || (isGitHubPages ? '/BRYN' : '');

const nextConfig = {
  reactStrictMode: true,
  ...(isGitHubPages && {
    output: 'export',
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
