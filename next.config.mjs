/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol:'https',
                hostname:'res.cloudinary.com',
                pathname:'/dnsnfrdjc/image/upload/'
            }
        ]
    }
};

export default nextConfig;
