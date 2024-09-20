/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com',
            },
            {
                hostname: 'fvvtqpkgirpnlmiemgcn.supabase.co',
            },
        ],        
    }
};


export default nextConfig;




