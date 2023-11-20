/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  env: {
    DIRECTORY_IMAGES: '/',
    DIRECTORY_AVATARS: '/avatars/'
    
  },
 
 
};
