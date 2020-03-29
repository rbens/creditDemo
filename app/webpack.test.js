module.exports = {
    mode : 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        debug: true,
                        esModules: true
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    }
};
