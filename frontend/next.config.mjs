import nodeLoader from 'node-loader';

const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add a custom rule for .node files
        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader',
        });

        // Necessary for react-pdf to work
        if (!isServer) {
            config.resolve.fallback.fs = false;
            config.resolve.fallback.path = false;
            config.resolve.fallback.crypto = false;
        }

        return config;
    },
};

export default nextConfig;