const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.tenor.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.vectorlogo.zone', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'wp.technologyreview.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'tenor.com', port: '', pathname: '/**' },
      
    ],
  },
}

export default nextConfig
