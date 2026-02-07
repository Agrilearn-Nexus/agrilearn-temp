import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    output: process.platform === "win32" ? undefined : "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ]
    }
};

export default nextConfig;
